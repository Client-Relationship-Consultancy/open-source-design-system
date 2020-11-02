import React from "react"
import { mount, shallow } from "enzyme"
import "jest-styled-components"
import Form from "../Form"
import Field, {CustomField} from "./Field"
import HelperErrorMessage from "../HelperErrorMessage"

const testForm = (
  <Form>
    <Field name="name" type="text" />
    <Field name="location" type="text" row />
    <Field name="subscribe" type="checkbox" row />
    <Field name="config" type="textarea" row />
  </Form>
)

describe("Testing default field layout", () => {
  const component = mount(testForm)

  it("Testing default layout", () => {
    const inputWrapperName = component.find('Field[name="name"]').find("InputWrapper")
    expect(inputWrapperName).toHaveStyleRule("flex-direction", "column")
    expect(inputWrapperName).toHaveStyleRule("align-items", "stretch")
  })

  it("Testing row layout", () => {
    const inputWrapperLocation = component.find('Field[name="location"]').find("InputWrapper")
    expect(inputWrapperLocation).toHaveStyleRule("flex-direction", "row")
    expect(inputWrapperLocation).toHaveStyleRule("align-items", "center")
  })

  it("Testing checkbox styles", () => {
    const inputWrapperSubscribe = component
      .find('Field[name="subscribe"]')
      .find("StyledFormikField")
    expect(inputWrapperSubscribe).toHaveStyleRule("margin", "0 0 0 0.5rem")
    expect(inputWrapperSubscribe).toHaveStyleRule("cursor", "pointer")
  })

  it("Match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })
})

describe("Testing Error and Caption messages", () => {
  it("should show error message", () => {
    const formkitProps = {
      values: { name: "" },
      handleChange: jest.fn(),
      errors: { name: "error" },
      touched: { name: true },
    }
    const component = shallow(
      <Field name="name" type="text" formik={formkitProps} caption="test caption" />,
    )
    expect(
      component.contains(
        <HelperErrorMessage error="error" caption="test caption" isError isFocus={false} />,
      ),
    )
  })
  it("should show caption message", () => {
    const formkitProps = {
      values: { name: "" },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: { name: false },
    }
    const component = shallow(
      <CustomField name="name" type="text" formik={formkitProps} caption="test caption" />,
    )
    component.instance().onFocus()
    expect(
      component.contains(
        <HelperErrorMessage error={undefined} caption="test caption" isError={undefined} isFocus />,
      ),
    ).toBeTruthy()
    component.instance().onBlur()
    expect(formkitProps.handleBlur).toBeCalled()
    expect(
      component.contains(
        <HelperErrorMessage error={undefined} caption="test caption" isError={undefined} isFocus />,
      ),
    ).toBeFalsy()
  })
})
