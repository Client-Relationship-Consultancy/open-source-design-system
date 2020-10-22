import React from "react"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import Select, { CustomSelect, LabelStyle } from "./Select"

describe("Select Input test", () => {
  const options = {
    dog: "Dogs",
    cat: "Cats",
    horse: "Horse",
    mouse: "Mouse",
  }

  const optionsElements = {
    dog: <span>Dog</span>,
    cat: <span>Cats</span>,
    horse: <span>Horse</span>,
    mouse: <span>Mouse</span>,
  }
  const onChange = jest.fn()

  const value = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
  ]

  const Blacklisted = ["cat"]
  const onChangeMulti = jest.fn()

  const commonProps = {
    options,
    onChange,
    id: "testId",
    isClearable: true,
  }

  const multiCommonProps = {
    ...commonProps,
    onChangeMulti,
    value,
    isMulti: true,
    blacklistedOptions: Blacklisted,
  }

  afterEach(() => {
    onChange.mockClear()
    onChangeMulti.mockClear()
  })

  it("test render options method", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    const renderedOptions = component.instance().renderOptions({ test1: "test2" })
    expect(renderedOptions[0]).toMatchObject({ value: "test1", label: "test2" })
  })
  it("returns the correctly formatted default value with label when value exists", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    const defaultValueObject = component.instance().buildDefaultValue("dog")
    expect(defaultValueObject).toMatchObject({ value: "dog", label: "Dogs" })
  })
  it("returns the given default value without formatting when value does not exist", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    const testValue = "testing"
    const defaultValueObject = component.instance().buildDefaultValue(testValue)
    expect(defaultValueObject).toMatch(testValue)
  })
  it("Returns defaultVal when defaultVal is not type of string", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    const testValue = 123
    const defaultValue = component.instance().buildDefaultValue(testValue)
    expect(defaultValue).toEqual(testValue)
  })
  it("options should be converted to correct format and ordered by label", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    expect(component.render().text()).toEqual("Type to search from the dropdown list...")
    expect(component.instance().renderOptions(options)).toEqual([
      { value: "cat", label: "Cats" },
      { value: "dog", label: "Dogs" },
      { value: "horse", label: "Horse" },
      { value: "mouse", label: "Mouse" },
    ])
  })

  it("options should be converted to correct format  with jsx elements", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    expect(component.render().text()).toEqual("Type to search from the dropdown list...")
    expect(component.instance().renderOptions(optionsElements)).toEqual([
      { value: "dog", label: <span>Dog</span> },
      { value: "cat", label: <span>Cats</span> },
      { value: "horse", label: <span>Horse</span> },
      { value: "mouse", label: <span>Mouse</span> },
    ])
  })

  it("options should be converted to correct format and ordered by custom sort function", () => {
    const customSort = (a, b) => b.label.localeCompare(a.label)
    const component = mount(
      <Select options={{}} id="testId" isClearable customSort={customSort} />,
    ).find("CustomSelect")
    expect(component.render().text()).toEqual("Type to search from the dropdown list...")
    expect(component.instance().renderOptions(options)).toEqual([
      { value: "mouse", label: "Mouse" },
      { value: "horse", label: "Horse" },
      { value: "dog", label: "Dogs" },
      { value: "cat", label: "Cats" },
    ])
  })
  it("match last snapshot", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    expect(component).toMatchSnapshot()
  })
  it("component multi match last snapshot", () => {
    const component = mount(<Select {...multiCommonProps} />).find("CustomSelect")

    expect(component).toMatchSnapshot()
  })
  it("returns the correctly formatted default value with label when there are no options", () => {
    const component = mount(<Select options={{}} id="testId" isClearable />).find("CustomSelect")
    const defaultValueObject = component.instance().buildDefaultValue("cat")
    expect(defaultValueObject).toMatchObject({ value: "cat", label: "cat" })
  })

  it("should call the correct onchange for non multi", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    component.instance().onChange({ value: "cat", label: "cat" })
    expect(onChange).toBeCalledWith({ value: "cat", label: "cat" })
  })
  it("should call the onchange for multi value", () => {
    const component = mount(<Select {...multiCommonProps} />).find("CustomSelect")
    component.instance().onChange([
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
    ])
    expect(onChangeMulti).toBeCalledWith([
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
    ])
  })

  it("should call the onChange with null", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    component.instance().onChange(null)
    expect(onChange).toBeCalledWith(null)
  })

  it("should call the onChange with null when it is multi", () => {
    const component = mount(<Select {...multiCommonProps} />).find("CustomSelect")
    component.instance().onChange(null)
    expect(onChangeMulti).toBeCalledWith(null)
  })

  it("should set width into the state if a number greater than 0 is passed as an argument", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    expect(component.state().componentWidth).toEqual(undefined)
    component.instance().setWidth(300)
    expect(component.state().componentWidth).toEqual(300)
  })

  it("should not set width if argument is 0 or null", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    expect(component.state().componentWidth).toEqual(undefined)
    component.instance().setWidth(0)
    expect(component.state().componentWidth).toEqual(undefined)
    component.instance().setWidth(null)
    expect(component.state().componentWidth).toEqual(undefined)
  })

  it("should not set width if componentWidth state is already populated", () => {
    const component = mount(<Select {...commonProps} />).find("CustomSelect")
    component.setState({ componentWidth: 500 })
    component.instance().setWidth(300)
    expect(component.state().componentWidth).toEqual(500)
  })

  it("should call setWidth if autosizeBasedOnPlaceholder is true", () => {
    const customProps = {
      ...commonProps,
      autosizeBasedOnPlaceholder: true,
    }
    const component = shallow(<CustomSelect {...customProps} />)

    const mockSetWidth = jest.fn()

    component.instance().setWidth = mockSetWidth
    component.update()
    component.render()

    expect(mockSetWidth).toHaveBeenCalled()
  })

  it("should not call setWidth if autosizeBasedOnPlaceholder is false", () => {
    const customProps = {
      ...commonProps,
      autosizeBasedOnPlaceholder: false,
    }
    const component = shallow(<CustomSelect {...customProps} />)

    const mockSetWidth = jest.fn()

    component.instance().setWidth = mockSetWidth
    component.update()
    component.render()

    expect(mockSetWidth).not.toHaveBeenCalled()
  })
})

describe("<LabelStyle />", () => {
  it("should have width auto when nothing is passed", () => {
    const component = mount(<LabelStyle />)
    expect(component).toHaveStyleRule("width", "auto")
  })

  it("should render a width if width is given", () => {
    const component = mount(<LabelStyle width={100} />)
    expect(component).toHaveStyleRule("width", "100px")
  })

  it("should render the correct css for the placeholder when autosizeBasedOnPlaceholder given", () => {
    const component = mount(<LabelStyle width={100} autosizeBasedOnPlaceholder />)
    expect(component).toHaveStyleRule("width", "100px")
    expect(component).toHaveStyleRule("transform", "none", {
      modifier: 'div[class$="placeholder"]',
    })
    expect(component).toHaveStyleRule("position", "relative", {
      modifier: 'div[class$="placeholder"]',
    })
    expect(component).toHaveStyleRule("margin-right", "calc(-100% + 8px)", {
      modifier: 'div[class$="placeholder"]',
    })
  })
})
