import React from "react"
import { shallow } from "enzyme"

import SelectValueRenderer from "../SelectValueRenderer"

describe("SelectValueRenderer", () => {
  const commonProps = {
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

  it("should render the given falsy value", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} value={null} />)
    expect(component.instance().renderValue()).toBeFalsy()
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
