import React from "react"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import Paragraph from "./Paragraph"
import "jest-styled-components"

describe("Paragraph", () => {
  it("should match snapshot", () => {
    const component = shallow(<Paragraph>Hello</Paragraph>)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it("should be render the text hello", () => {
    const component = shallow(<Paragraph>Hello</Paragraph>)
    expect(component.text()).toEqual("Hello")
  })
  it("should by default not be the last paragraph with the correct styling", () => {
    const component = mount(<Paragraph>Hello</Paragraph>)
    expect(component).toHaveStyleRule("margin", "0 0 0.5rem")
    expect(component.find("StyledParagraph").props().lastParagraph).toEqual(false)
  })
  it("should be the last paragraph with the correct styling", () => {
    const component = mount(<Paragraph lastParagraph>Hello</Paragraph>)
    expect(component.props().lastParagraph).toEqual(true)
    expect(component).toHaveStyleRule("margin", "0 0 1.5rem")
  })
})
