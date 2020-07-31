import React from "react"
import { shallow, mount } from "enzyme"
import CheckRenderer, { IconWrapper } from "../CheckRenderer"
import "jest-styled-components"

describe("<CheckRenderer />", () => {
  it("should match snapshot", () => {
    const component = shallow(<CheckRenderer value />)
    expect(component).toMatchSnapshot()
  })

  it("should render a check if the value is true", () => {
    const component = shallow(<CheckRenderer value />)
    const iconProps = component.find("Icon").props()
    expect(iconProps.name).toEqual("check")
    expect(iconProps.color).toEqual("primary")
  })

  it("should render a cross/times if the value is false", () => {
    const component = shallow(<CheckRenderer value={false} />)
    const iconProps = component.find("Icon").props()
    expect(iconProps.name).toEqual("times")
    expect(iconProps.color).toEqual("error")
  })

  it("should render nothing if the value is not a true or false", () => {
    const component = shallow(<CheckRenderer value={null} />)
    expect(component.find("Icon").exists()).toEqual(false)

    component.setProps({ value: "alright" })
    expect(component.find("Icon").exists()).toEqual(false)

    component.setProps({ value: "" })
    expect(component.find("Icon").exists()).toEqual(false)

    component.setProps({ value: undefined })
    expect(component.find("Icon").exists()).toEqual(false)

    component.setProps({ value: 123 })
    expect(component.find("Icon").exists()).toEqual(false)
  })

  it("should pass a custom size to the wrapper when a size is given", () => {
    const component = shallow(<CheckRenderer value size="20px" />)
    expect(component.find("IconWrapper").props().size).toEqual("20px")
  })
})

describe("<IconWrapper />", () => {
  it("should match snapshot", () => {
    const component = mount(<IconWrapper />)
    expect(component).toMatchSnapshot()
  })

  it("should default to 1.5rem when no size is given", () => {
    const component = mount(<IconWrapper />)
    expect(component).toHaveStyleRule("font-size", "1.5rem")
  })

  it("should use the custom size if size is provided", () => {
    const component = mount(<IconWrapper size="100px" />)
    expect(component).toHaveStyleRule("font-size", "100px")
  })
})
