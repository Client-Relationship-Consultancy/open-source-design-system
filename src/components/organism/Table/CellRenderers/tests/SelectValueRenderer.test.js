import React from "react"
import { mount, shallow } from "enzyme"
import SelectValueRenderer  from "../SelectValueRenderer"


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
    const renderer = new SelectValueRenderer();
    renderer.init(commonProps);
    expect(renderer.getGui()).toMatchSnapshot()
  })

  it("should render the given value even if it is not in the options", () => {
    const renderer = new SelectValueRenderer()
    renderer.init(commonProps);
    expect(renderer.renderValue()).toEqual("girls")
  })

  it("should render a string with a space when given a falsy value to ensure the cursor is still a pointer on hover", () => {
    const renderer = new SelectValueRenderer()
    const props = {
      ...commonProps,
      value: ""
    }
    renderer.init(props);
    expect(renderer.renderValue()).toEqual(" ")
  })

  it("should fire the startEditingCell function when the dropdown button is clicked a single time", () => {
    const renderer = new SelectValueRenderer()
    renderer.init({
      ...commonProps,
      value:null,
      rowIndex:1,
      node:{rowIndex: 5 },
      colDef:{ field: "testCol" }
    });
    renderer.getGui().querySelector("button").click();
    expect(startEditingCellMock).toBeCalledTimes(1)
    expect(startEditingCellMock).toBeCalledWith({ colKey: "testCol", rowIndex: 5 })
  })

  it("should render the label of the given value from the options", () => {
    const values = [
      { label: "foo", value: "bar" },
      { label: "hello", value: "world" },
      { label: "no", value: "yes" },
      { label: "spice", value: "girls" },
    ]
    const renderer = new SelectValueRenderer()
    renderer.init({
      ...commonProps,
      colDef:{ cellEditorParams: { values }}
    });
    expect(renderer.renderValue()).toEqual("spice")
  })

  it("should render the given value if options do not exist", () => {
    const renderer = new SelectValueRenderer()
    renderer.init({
      ...commonProps,
      colDef:{ cellEditorParams: {values: [] }}
    });
    expect(renderer.renderValue()).toEqual("girls")
  })
})
