import React from "react"
import { mount, shallow } from "enzyme"
import FormikSelect, { CustomSelect } from "./FormikSelect"
import Form from "../Form"
import HelperErrorMessage from "../HelperErrorMessage/HelperErrorMessage"

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

  it("Render options into the correct format ordered by label", () => {
    const component = mount(
      <Form>
        <FormikSelect name="name" options={petOptions} id="testId" onChange={mockFn} />
      </Form>,
    )

    expect(component.find("Select").last().props().options).toEqual([
      { value: "bird", label: "Bird" },
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
      { value: "rabbit", label: "Rabbit" },
    ])
  })

  it("Match last snapshot", () => {
    const component = mount(
      <Form>
        <FormikSelect name="name" options={petOptions} id="testId" onChange={mockFn} />
      </Form>,
    )
    expect(component).toMatchSnapshot()
  })

  it("check onChange function", () => {
    const componentSelect = shallow(
      <CustomSelect name="name" onChange={mockFn} formik={formikProps} />,
    )
    componentSelect.instance().onChange("hello")
    expect(mockFn).toHaveBeenCalledWith("name", "hello")
    expect(formikMockFn).toHaveBeenCalledWith("name", "hello")
  })

  it("should set the value as an empty string when the value is null", () => {
    const componentSelect = shallow(
      <CustomSelect name="name" onChange={mockFn} formik={formikProps} />,
    )
    componentSelect.instance().onChange(null)
    expect(mockFn).toHaveBeenCalledWith("name", null)
    expect(formikMockFn).toHaveBeenCalledWith("name", "")
  })

  it("check onBlur function", () => {
    const componentSelect = shallow(
      <CustomSelect name="name" onChange={mockFn} formik={formikProps} />,
    )
    componentSelect.instance().onBlur()
    expect(componentSelect.state().touched).toBeTruthy()
  })

  it("render error message and caption message", () => {
    const componentSelect = shallow(
      <CustomSelect name="name" onChange={mockFn} formik={formikProps} />,
    )
    const formikErrorProps = {
      values: { name: "" },
      errors: { name: "error" },
      setFieldValue: formikMockFn,
    }
    componentSelect.setProps({ formik: formikErrorProps })
    componentSelect.instance().onBlur()
    expect(
      componentSelect.contains(
        <HelperErrorMessage error="error" caption="test caption" isError isFocus={false} />,
      ),
    ).toBeTruthy()
    const NewformikErrorProps = {
      values: { name: "" },
      errors: {},
      setFieldValue: formikMockFn,
    }
    componentSelect.setProps({ formik: NewformikErrorProps })
    componentSelect.instance().onFocus()
    expect(
      componentSelect.contains(
        <HelperErrorMessage error={undefined} caption="test caption" isError={undefined} isFocus />,
      ),
    ).toBeTruthy()
  })

  it("should get the initial value in the correct format if formik value is a string", () => {
    const componentSelect = shallow(
      <CustomSelect
        name="name"
        onChange={mockFn}
        formik={{ values: { name: "dog" } }}
        options={petOptions}
      />,
    )

    expect(componentSelect.instance().getInitialValue()).toEqual({
      value: "dog",
      label: "Dog",
    })
  })

  it("should get the initial value in the correct format if formik value is a dropdown", () => {
    const componentSelect = shallow(
      <CustomSelect
        name="name"
        onChange={mockFn}
        formik={{ values: { name: { value: "dog", label: "Dog" } } }}
        options={petOptions}
      />,
    )

    expect(componentSelect.instance().getInitialValue()).toEqual({
      value: "dog",
      label: "Dog",
    })
  })

  it("should return false as the value for the dropdown if it does not exist in formik values", () => {
    const componentSelect = shallow(
      <CustomSelect name="name" onChange={mockFn} formik={{ values: {} }} options={petOptions} />,
    )

    expect(componentSelect.instance().getInitialValue()).toBeFalsy()
  })
})
