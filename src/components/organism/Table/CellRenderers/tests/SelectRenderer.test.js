import React from "react"
import { shallow } from "enzyme"
import "jest-styled-components"
import { colourPalette } from "../../../../../brandColours.ts"
import SelectRenderer, { Select } from "../SelectRenderer"

const theme = {
  props: {
    theme: colourPalette.examplePalette,
  },
}
const api = {
  stopEditing: jest.fn(),
}

const commonOptions = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
]

describe("Test handle Change", () => {
  let component
  beforeEach(() => {
    component = shallow(
      <SelectRenderer
        agGridReact={theme}
        values={["option 1", "option 2"]}
        value="option 1"
        isClearable
        node={{ fromTop: 140 }}
        api={api}
      />,
    )
  })

  it("Sets the selected value on handleChange", () => {
    const newOption = { value: "option value", label: "option label" }
    component.instance().handleChange(newOption)
    expect(component.state().value).toEqual("option value")
    expect(api.stopEditing).toBeCalledWith(false)
  })

  it("Sets the selected value as null when the value is cleared", () => {
    const newOption = null
    component.instance().handleChange(newOption)
    expect(component.state().value).toEqual(newOption)
    expect(api.stopEditing).toBeCalledWith(false)
  })

  it("Test get value returns correct value", () => {
    expect(component.instance().getValue()).toEqual("option 1")
  })

  it("match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })

  it("should handle a falsy value for value prop", () => {
    const tree = shallow(
      <SelectRenderer
        agGridReact={theme}
        values={["option 1", "option 2"]}
        value={null}
        isClearable
        node={{ fromTop: 140 }}
      />,
    )
    const select = tree
      .dive()
      .dive()
      .find("Select")
    expect(select.props().value).toBeFalsy()
  })
})

describe("Select", () => {
  it("match last snapshot", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={["option 1", "option 2"]} value="option 1" />,
    )
    expect(component).toMatchSnapshot()
  })

  it("should render an array of strings into an object with value and label keys", () => {
    const options = ["away", "boom", "caw"]
    const component = shallow(
      <Select agGridReact={theme} isClearable values={options} value="option 1" />,
    )
    expect(component.instance().renderOptions()).toMatchObject([
      { value: "away", label: "away" },
      { value: "boom", label: "boom" },
      { value: "caw", label: "caw" },
    ])
  })

  it("should render the values as is if options is not an array of strings", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value="option 1" />,
    )
    expect(component.instance().renderOptions()).toMatchObject([
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ])
  })

  it("should render the matching object from the options array of objects", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value="option-1" />,
    )
    expect(component.instance().renderValue()).toMatchObject({
      label: "Option 1",
      value: "option-1",
    })
  })

  it("should render the matching object from the options array of strings", () => {
    const options = ["alpha", "bravo", "charlie"]
    const component = shallow(
      <Select agGridReact={theme} isClearable values={options} value="alpha" />,
    )
    expect(component.instance().renderValue()).toMatchObject({
      label: "alpha",
      value: "alpha",
    })
  })

  it("should return a falsy value when given a falsy value", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value={null} />,
    )
    expect(component.instance().renderValue()).toBeFalsy()
  })

  it("should render top when it is more than 250px from the top", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value={null} fromTop={251} />,
    )
    expect(component.instance().menuPlacement()).toEqual("top")
  })

  it("should render bottom when it is less than 250px from the top", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value={null} fromTop={249} />,
    )
    expect(component.instance().menuPlacement()).toEqual("bottom")
  })

  it("should render bottom when it is 250px from the top", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value={null} fromTop={250} />,
    )
    expect(component.instance().menuPlacement()).toEqual("bottom")
  })

  it("should render bottom when fromTop is not passed", () => {
    const component = shallow(
      <Select agGridReact={theme} isClearable values={commonOptions} value={null} />,
    )
    expect(component.instance().menuPlacement()).toEqual("bottom")
  })
})
