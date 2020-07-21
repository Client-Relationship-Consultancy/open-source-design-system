import React from "react"
import { shallow, mount } from "enzyme"

import SelectValueRenderer, {Wrapper} from "../SelectValueRenderer"

describe("Wrapper", () => {
  it("should match snapshot", () => {
    const component = mount(<Wrapper />)
    expect(component).toMatchSnapshot()
  })
})

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

  it("should render a string with a space when given a falsy value to ensure the cursor is still a pointer on hover", () => {
    const component = shallow(<SelectValueRenderer {...commonProps} value={null} />)
    expect(component.instance().renderValue()).toEqual(" ")
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
