import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import { colourPalette } from "../../../../brandColours"

import IconButton from "./IconButton"

const { action } = colourPalette.examplePalette

describe("IconButton", () => {
  it("should match snapshot with defaults", () => {
    const component = mount(<IconButton />)
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is small", () => {
    const component = mount(<IconButton icon="save" buttonSize="small" />)
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is medium", () => {
    const component = mount(<IconButton icon="save" buttonSize="medium" />)
    expect(component).toMatchSnapshot()
  })

  it("should match snapshot when buttonSize is large", () => {
    const component = mount(<IconButton icon="save" buttonSize="large" />)
    expect(component).toMatchSnapshot()
  })

  it("should render the icon if it's passed in as a non-string (svg) value", () => {
    const selectArrowSvg = (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" strokeWidth="5" />
      </svg>
    )

    const component = mount(<IconButton icon={selectArrowSvg} />)

    expect(component.find(".dsButtonIcon")).toHaveLength(1)
    expect(component.contains(selectArrowSvg)).toEqual(true)
  })

  it("should have the correct ghost styling when passed ghost prop", () => {
    const component = mount(<IconButton buttonType="ghost" />)

    expect(component.find("StyledIconButton")).toHaveStyleRule("color", action.main.hex)
    expect(component.find("StyledIconButton")).toHaveStyleRule("background-color", "transparent")
    expect(component.find("StyledIconButton")).toHaveStyleRule("border", "1px solid transparent")
  })

  it("should not render text child when passed", () => {
    const component = mount(<IconButton>Button Label</IconButton>)

    expect(component.find("span")).toHaveLength(0)
    expect(component).not.toContain("Button Label")
  })
})
