import React from "react"
import { mount, shallow } from "enzyme"
import FormikSelect, { CustomSelect } from "./FormikSelect"
import Form from "../Form"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

describe("FormikSelect Component Test", () => {
  const petOptions = {
    dog: "Dog",
    cat: "Cat",
    bird: "Bird",
    rabbit: "Rabbit",
  }

  const formikMockFn = jest.fn()
  const formikProps = {
    values: { name: "" },
    errors: { name: "" },
    setFieldValue: formikMockFn,
  }

  const mockFn = jest.fn()

  const component = mount(
    <Form>
      <FormikSelect name="name" options={petOptions} id="testId" onChange={mockFn} />
    </Form>,
  )

  const componentSelect = shallow(
    <CustomSelect name="name" onChange={mockFn} formik={formikProps} />,
  )

  it("Render options into the correct format ordered by label", () => {
    expect(
      component
        .find("Select")
        .last()
        .props().options,
    ).toEqual([
      { value: "bird", label: "Bird" },
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
      { value: "rabbit", label: "Rabbit" },
    ])
  })

  it("Match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })

  it("check onChange function", () => {
    componentSelect.instance().onChange("hello")
    expect(mockFn).toHaveBeenCalledWith("name", "hello")
    expect(formikMockFn).toHaveBeenCalledWith("name", "hello")
  })

  it("should set the value as an empty string when the value is null", () => {
    componentSelect.instance().onChange(null)
    expect(mockFn).toHaveBeenCalledWith("name", null)
    expect(formikMockFn).toHaveBeenCalledWith("name", "")
  })

  it("check onBlur function", () => {
    componentSelect.instance().onBlur()
    expect(componentSelect.state().touched).toBeTruthy()
  })

  it("render error message", () => {
    const formikErrorProps = {
      values: { name: "" },
      errors: { name: "error" },
      setFieldValue: formikMockFn,
    }
    componentSelect.setProps({ formik: formikErrorProps })
    componentSelect.instance().onBlur()
    expect(
      componentSelect.contains(<ErrorMessage error="error" caption={undefined} isError />),
    ).toBeTruthy()
  })
})
