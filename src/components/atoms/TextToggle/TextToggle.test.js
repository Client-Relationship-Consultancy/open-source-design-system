import React from "react"
import { shallow, mount } from "enzyme"
import "jest-styled-components"

import TextToggle from "./TextToggle"

describe("TextToggle Component Testing", () => {
  it("should match snapshot", () => {
    const onChange = jest.fn()
    const component = shallow(<TextToggle onChange={onChange} />)
    expect(component).toMatchSnapshot()
  })

  it("should change value when clicked", () => {
    const onChange = jest.fn()
    const component = shallow(<TextToggle onChange={onChange} />)
    component.find("Toggle").simulate("change", { target: { checked: true } })
    expect(onChange).toHaveBeenCalled()
  })

  it("should have different styling when enabled", () => {
    const component = mount(<TextToggle />)
    expect(component.find("Label")).toHaveStyleRule("cursor", "pointer")
    expect(component.find("Label")).toHaveStyleRule("opacity", "1")
  })

  it("should have different styling when disabled", () => {
    const component = mount(<TextToggle isDisabled />)
    expect(component.find("Label")).toHaveStyleRule("cursor", "not-allowed")
    expect(component.find("Label")).toHaveStyleRule("opacity", "0.4")
  })
})

