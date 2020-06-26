import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import Select from "./Select"

describe("Select Input test", () => {
  const options = {
    dog: "Dogs",
    cat: "Cats",
    horse: "Horse",
    mouse: "Mouse",
  }
  const component = mount(<Select options={options} id="testId" isClearable />).find("CustomSelect")
  const value = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ];
  const Blacklisted = ["cat"];
  const componentMulti = mount(
    <Select
      options={options}
      id="testId"
      isClearable
      isMulti
      value={value}
      blacklistedOptions={Blacklisted}
    />,
  ).find("CustomSelect")

  it("test render options method", () => {
    const renderedOptions = component.instance().renderOptions({ test1: "test2" })
    expect(renderedOptions[0]).toMatchObject({ value: "test1", label: "test2" })
  })
  it("returns the correctly formatted default value with label when value exists", () => {
    const defaultValueObject = component.instance().buildDefaultValue("dog")
    expect(defaultValueObject).toMatchObject({ value: "dog", label: "Dogs" })
  })
  it("returns the given default value without formatting when value does not exist", () => {
    const testValue = "testing"
    const defaultValueObject = component.instance().buildDefaultValue(testValue)
    expect(defaultValueObject).toMatch(testValue)
  })
  it("Returns defaultVal when defaultVal is not type of string", () => {
    const testValue = 123
    const defaultValue = component.instance().buildDefaultValue(testValue)
    expect(defaultValue).toEqual(testValue)
  })
  it("options should be converted to correct format and ordered by label", () => {
    expect(component.render().text()).toEqual("Type to search from the dropdown list...")
    expect(component.instance().renderOptions(options)).toEqual([
      { value: "cat", label: "Cats" },
      { value: "dog", label: "Dogs" },
      { value: "horse", label: "Horse" },
      { value: "mouse", label: "Mouse" },
    ])
  })
  it("match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })
  it("component multi match last snapshot", () => {
    expect(componentMulti).toMatchSnapshot()
  })
  it("returns the correctly formatted default value with label when there are no options", () => {
    const newComponent = mount(<Select options={{}} id="testId" isClearable />).find("CustomSelect")
    const defaultValueObject = newComponent.instance().buildDefaultValue("cat")
    expect(defaultValueObject).toMatchObject({ value: "cat", label: "cat" })
  })
})
