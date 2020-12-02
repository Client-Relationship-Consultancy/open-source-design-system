import React from "react"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import CustomTextEditor from "../CustomTextEditor"

describe("CustomTextEditor test", () => {
  let component
  beforeEach(() => {
    component = shallow(<CustomTextEditor value="mock initial value" />)
  })

  it("should match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })

  it("sets the value to state using handleChange", () => {
    const newValue = "new mocked value"
    component.instance().handleChange({ target: { value: newValue } })
    expect(component.state().value).toEqual(newValue)
  })

  it("passes the maxLength prop to the input, which handles the char limit", () => {
    const mComponent = mount(<CustomTextEditor maxLength={10} value="" />)
    const input = mComponent.find("input")

    expect(input.prop("maxLength")).toBe(10)
  })

  it("should focus and select the input ref after GUI attached", () => {
    component.instance().componentRef = { current: { focus: jest.fn(), select: jest.fn() } }
    const inputRef = component.instance().componentRef.current

    component.instance().afterGuiAttached()

    expect(inputRef.focus).toHaveBeenCalled()
    expect(inputRef.select).toHaveBeenCalled()
  })

  it("should use the ref prop when useInnerRef prop is false", () => {
    component.setProps({
      useInnerRef: false,
    })
    expect(component.instance().createRefProp()).toEqual({
      ref: component.instance().componentRef,
    })
  })

  it("should use the innerRef prop when useInnerRef prop is true", () => {
    component.setProps({
      useInnerRef: true,
    })
    expect(component.instance().createRefProp()).toEqual({
      innerRef: component.instance().componentRef,
    })
  })
})
