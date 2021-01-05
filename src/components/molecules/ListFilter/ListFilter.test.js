import React from "react"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import "jest-styled-components"
import ListFilter from "./ListFilter"

const options = ["Hello", "Foo", "Bar", "World"]
const formattedOptions = (arr) => arr.map((item) => ({ key: item, id: item, value: <p>{item}</p> }))

describe("FilterableList Component Testing", () => {
  const componentFull = mount(<ListFilter items={formattedOptions(options)} />)
  const component = shallow(<ListFilter items={formattedOptions(options)} />)
  const componentInstance = component.instance()
  const emptyComponent = mount(<ListFilter />)
  it("should match snapshot", () => {
    const tree = toJson(componentFull)
    expect(tree).toMatchSnapshot()
  })
  it("Does not render a list if the options props is empty", () => {
    expect(emptyComponent.find("NoResults").exists()).toEqual(true)
    expect(emptyComponent).toMatchSnapshot()
  })
  it("Render the correct number of items", () => {
    expect(component.find("ListItem").length).toEqual(options.length)
  })
  it("Typing in search filters items", () => {
    component.find("Search").simulate("change", {
      currentTarget: {
        value: "Hello",
      },
    })
    expect(component.find("ListItem").length).toEqual(1)
    expect(component.find("p").length).toEqual(1)
  })
  it("Typing bad regex search doesn't break component", () => {
    component.find("Search").simulate("change", {
      currentTarget: {
        value: "*",
      },
    })
    expect(component.find("ListItem").length).toEqual(1)
    expect(component.find("NoResults").exists()).toBeTruthy()
  })

  it("should reset the search field when the props are updated", () => {
    component.find("Search").simulate("change", {
      currentTarget: {
        value: "this is old",
      },
    })
    expect(component.state().value).toEqual("this is old")
    component.setProps({ items: [{ id: "new item", key: "new item", value: <p>new item</p> }] })
    expect(component.state().value).toEqual("")
  })

  it("compareWords should return the right value to order the words", () => {
    const data = [
      "Ahsa",
      "ab",
      "àb",
      "Bhsd",
      "bhas",
      "àpple",
      "apple",
      "abple",
      "Apple",
      "10Banana Boat",
      "1Crab",
      "2Dog",
      "Super Book",
      "Anaconda",
      "Boat",
      "Amazonzzz",
    ]
    const result = [
      "10Banana Boat",
      "1Crab",
      "2Dog",
      "Ahsa",
      "Amazonzzz",
      "Anaconda",
      "Apple",
      "ab",
      "abple",
      "apple",
      "àb",
      "àpple",
      "Bhsd",
      "Boat",
      "bhas",
      "Super Book",
    ]
    expect(data.sort(componentInstance.compareWords)).toEqual(result)
  })
})
