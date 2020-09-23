import React from "react"
import { shallow, mount } from "enzyme"
import { ThemeProvider } from "styled-components"

import { colourPalette } from "../../../../../brandColours"
import SelectValueRenderer, { Wrapper } from "../SelectValueRenderer"

describe("Wrapper", () => {
  it("should match snapshot", () => {
    const component = mount(
      <ThemeProvider theme={colourPalette.examplePalette}>
        <Wrapper />
      </ThemeProvider>,
    )
    expect(component).toMatchSnapshot()
  })
})

describe("SelectValueRenderer", () => {
  const startEditingCellMock = jest.fn()
  const commonProps = {
    api: { startEditingCell: startEditingCellMock },
    value: "girls",
    colDef: {
      cellEditorParams: { values: ["alpha", "bravo", "charlie"] },
    },
  }
  it("should match snapshot", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} />)
    expect(component).toMatchSnapshot()
  })

  it("should render the given value even if it is not in the options", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} />)
    expect(component.instance().renderValue()).toEqual("girls")
  })

  it("should render a string with a space when given a falsy value to ensure the cursor is still a pointer on hover", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} value={null} />)
    expect(component.instance().renderValue()).toEqual(" ")
  })

  it("should fire the startEditingCell function when the dropdown button is clicked a single time", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} value={null} />)
    component.find("button").simulate("click")
    expect(startEditingCellMock).toBeCalledTimes(1)
  })

  it("should render the label of the given value from the options", () => {
    const values = [
      { label: "foo", value: "bar" },
      { label: "hello", value: "world" },
      { label: "no", value: "yes" },
      { label: "spice", value: "girls" },
    ]
    const component = shallow(
      <SelectValueRenderer {...commonProps} colDef={{ cellEditorParams: { values } }} />,
    )
    expect(component.instance().renderValue()).toEqual("spice")
  })

  it("should render the given value if options do not exist", () => {
    const component = shallow(
      <SelectValueRenderer {...commonProps} colDef={{ cellEditorParams: { values: [] } }} />,
    )
    expect(component.instance().renderValue()).toEqual("girls")
  })
})
