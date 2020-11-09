import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import { colourPalette } from "../../../brandColours"

import Button from "./Button"

const { action } = colourPalette.examplePalette

describe("Button", () => {
  it("should match snapshot with defaults", () => {
    const component = mount(<Button>Save</Button>)
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is medium", () => {
    const component = mount(
      <Button icon="save" buttonSize="medium" onClick={() => {}}>
        Save
      </Button>,
    )
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is small", () => {
    const component = mount(
      <Button icon="save" buttonSize="small" onClick={() => {}}>
        Save
      </Button>,
    )
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is large, and no iconSize is provided", () => {
    const component = mount(
      <Button icon="save" buttonSize="large" onClick={() => {}}>
        Save
      </Button>,
    )
    expect(component).toMatchSnapshot()
  })

  it("should have correct styling when buttonSize AND iconSize are large", () => {
    const component = mount(
      <Button
        icon="save"
        buttonSize="large"
        iconSize="large"
        iconPosition="before"
        onClick={() => {}}
      >
        Save
      </Button>,
    )
    expect(component).toMatchSnapshot()
  })

  it("should render the icon if it's passed in as a non-string (svg) value", () => {
    const selectArrowSvg = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" strokeWidth="5" />
      </svg>
    )

    const component = mount(
      <Button icon={selectArrowSvg} onClick={() => {}}>
        Save
      </Button>,
    )

    expect(component.find(".dsButtonIcon")).toHaveLength(1)
    expect(component.contains(selectArrowSvg)).toEqual(true)
  })

  it("should have correct flex styling when an icon is passed with position after", () => {
    const component = mount(
      <Button icon="save" iconPosition="after" onClick={() => {}}>
        Save
      </Button>,
    )

    expect(component.find("StyledButton")).toHaveStyleRule("flex-direction", "row-reverse")
  })

  it("should have the correct ghost styling when passed ghost prop", () => {
    const component = mount(
      <Button icon="save" onClick={() => {}} buttonType="ghost">
        Save
      </Button>,
    )
    expect(component.find("StyledButton")).toHaveStyleRule("color", action.main.hex)
    expect(component.find("StyledButton")).toHaveStyleRule("background-color", "transparent")
    expect(component.find("StyledButton")).toHaveStyleRule("border", "1px solid transparent")
  })
})
