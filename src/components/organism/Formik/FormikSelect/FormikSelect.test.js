import React from "react"
import { mount, shallow } from "enzyme"
import FormikSelect, { CustomSelect } from "./FormikSelect"
import Form from "../Form"
import HelperErrorMessage from "../HelperErrorMessage/HelperErrorMessage"

describe("FormikSelect Component Test", () => {
  const commonProps = {
    options: {
      dog: "Dog",
      cat: "Cat",
      bird: "Bird",
      rabbit: "Rabbit",
    },
    id: "testId",
    onChange: jest.fn(),
    name: "name",
    caption: "test caption",
  }
  let component
  beforeEach(() => {
    component = mount(
      <Form>
        <FormikSelect {...commonProps} />
      </Form>,
    )
  })

  it("Render options into the correct format ordered by label", () => {
    expect(component.find("Select").last().props().options).toEqual([
      { value: "bird", label: "Bird" },
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
      { value: "rabbit", label: "Rabbit" },
    ])
  })

  it("Match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })
})
describe("CustomSelect Component Test", () => {
  let component
  const commonProps = {
    onChange: jest.fn(),
    formik: {
      values: { name: "" },
      errors: { name: "" },
      setFieldValue: jest.fn(),
    },
    name: "name",
    options: {
      dog: "Dog",
      cat: "Cat",
      bird: "Bird",
      rabbit: "Rabbit",
    },
    caption: "test caption",
  }

  beforeEach(() => {
    component = shallow(<CustomSelect {...commonProps} />)
  })

  it("check onChange function", () => {
    component.instance().onChange("hello")
    expect(commonProps.onChange).toHaveBeenCalledWith("name", "hello")
    expect(commonProps.formik.setFieldValue).toHaveBeenCalledWith("name", "hello")
  })

  it("should set the value as an empty string when the value is null", () => {
    component.instance().onChange(null)
    expect(commonProps.onChange).toHaveBeenCalledWith("name", null)
    expect(commonProps.formik.setFieldValue).toHaveBeenCalledWith("name", "")
  })

  it("check onBlur function", () => {
    component.instance().onBlur()
    expect(component.state().touched).toBeTruthy()
  })

  it("render error message and caption message", () => {
    const formikErrorProps = {
      values: { name: "" },
      errors: { name: "error" },
      setFieldValue: jest.fn(),
    }
    component.setProps({ formik: formikErrorProps })
    component.instance().onBlur()
    expect(
      component.contains(
        <HelperErrorMessage error="error" caption="test caption" isError isFocus={false} />,
      ),
    ).toBeTruthy()

    const newFormikErrorProps = {
      values: { name: "" },
      errors: {},
      setFieldValue: jest.fn(),
    }
    component.setProps({ formik: newFormikErrorProps })
    component.instance().onFocus()
    expect(
      component.contains(
        <HelperErrorMessage error={undefined} caption="test caption" isError={undefined} isFocus />,
      ),
    ).toBeTruthy()
  })

  it("should get the initial value in the correct format if formik value is a string", () => {
    const customProps = {
      ...commonProps,
      formik: {
        ...commonProps.formik,
        values: { name: "dog" },
      },
    }

    component.setProps(customProps)

    expect(component.instance().getValue()).toEqual({
      value: "dog",
      label: "Dog",
    })
  })

  it("should get the initial value in the correct format if formik value is a dropdown", () => {
    const customProps = {
      ...commonProps,
      formik: {
        ...commonProps.formik,
        values: { name: { value: "dog", label: "Dog" } },
      },
    }
    component.setProps(customProps)

    expect(component.instance().getValue()).toEqual({
      value: "dog",
      label: "Dog",
    })
  })

  it("should return false as the value for the dropdown if it does not exist in formik values", () => {
    const customProps = {
      ...commonProps,
      formik: {
        ...commonProps.formik,
        values: {},
      },
    }
    component.setProps(customProps)

    expect(component.instance().getValue()).toBeFalsy()
  })
})
