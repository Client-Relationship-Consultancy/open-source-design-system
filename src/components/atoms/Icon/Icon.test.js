import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import toJson from "enzyme-to-json"
import { colourPalette } from "../../../brandColours"
import Icon from "./Icon"

describe("Icon test", () => {
  it("match last snapshot", () => {
    const component = mount(<Icon name="check" color="primary" shade="main" />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it("matches snapshot with rotation", () => {
    const component = mount(<Icon name="check" rotateDegrees={45} />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it("should be coloured black if no colour is specified", () => {
    const component = mount(<Icon name="check" />)
    expect(component.find("StyledFontAwesomeIcon")).toHaveStyleRule(
      "color",
      colourPalette.examplePalette.black.main.hex,
    )
  })
  it("should be able to handle colors without shade", () => {
    const component = mount(<Icon name="check" color="white" />)
    expect(component.find("StyledFontAwesomeIcon")).toHaveStyleRule(
      "color",
      colourPalette.examplePalette.white.hex,
    )
  })
  it("should be rotated in css when rotate props is passed", () => {
    const component = mount(<Icon name="check" rotateDegrees={45} />)
    expect(component).toHaveStyleRule("transform", "rotate(45deg)")
  })

  it("should be display none in css when props isVisible is false", () => {
    const component = mount(<Icon name="check" isVisible={false} />)
    expect(component).toHaveStyleRule("display", "none")
  })

  it("should be visible when props isVisible is true", () => {
    const component = mount(<Icon name="check" isVisible />)
    expect(component).not.toHaveStyleRule("display", "none")
  })

  it("should be visible when isVisible props is not passed", () => {
    const component = mount(<Icon name="check" />)
    expect(component).not.toHaveStyleRule("display", "none")
  })

  it("should have cursor pointer in css when props onClick is passed", () => {
    const mockFn = jest.fn()
    const component = mount(<Icon name="check" onClick={mockFn} />)
    expect(component.find("StyledFontAwesomeIcon")).toHaveStyleRule("cursor", "pointer")
    component.find("StyledFontAwesomeIcon").simulate("click")
    expect(mockFn).toHaveBeenCalled()
  })
})
