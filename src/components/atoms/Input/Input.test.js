import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import Input, { Container, StyledInput } from "./Input"
import { colourPalette } from "../../../brandColours"

const { black } = colourPalette.examplePalette

describe("Input", () => {
  const commonProps = {
    value: "Hello",
    name: "example",
    type: "text",
    onChange: () => {},
  }

  it("render input with value", () => {
    const component = mount(<Input {...commonProps} />)
    expect(component.prop("value")).toEqual("Hello")
  })

  it("render matches last snapshot", () => {
    const component = mount(<Input {...commonProps} />)
    expect(component).toMatchSnapshot()
  })

  it("render matches last snapshot with classname", () => {
    const customProps = {
      ...commonProps,
      className: "testClassName",
    }
    const component = mount(<Input {...customProps} />)
    expect(component.props().className).toEqual("testClassName")
  })
})

describe("<Container />", () => {
  it("should match last snapshot", () => {
    const component = mount(<Container />)
    expect(component).toMatchSnapshot()
  })

  it("should have background colour as transparent if no bgColor is passed", () => {
    const component = mount(<Container />)
    expect(component.find("Container")).toHaveStyleRule("background-color", "transparent")
  })

  it("should have background colour if bgColor is passed", () => {
    const component = mount(<Container bgColor="red" />)
    expect(component.find("Container")).toHaveStyleRule("background-color", "red")
  })

  it("should have no border if border is not passed", () => {
    const component = mount(<Container />)
    expect(component.find("Container")).toHaveStyleRule("none")
  })

  it("should have bottom border if border is passed bottom", () => {
    const component = mount(<Container border="bottom" />)
    expect(component.find("Container")).toHaveStyleRule("border", undefined)
    expect(component.find("Container")).toHaveStyleRule("border-bottom", `1px solid ${black.tint60.hex}`)
  })

  it("should have a border if border is passed all", () => {
    const component = mount(<Container border="all" />)
    expect(component.find("Container")).toHaveStyleRule("border", `1px solid ${black.tint60.hex}`)
  })
})

describe("<StyledInput />", () => {
  it("should match last snapshot", () => {
    const component = mount(<StyledInput />)
    expect(component).toMatchSnapshot()
  })
})
