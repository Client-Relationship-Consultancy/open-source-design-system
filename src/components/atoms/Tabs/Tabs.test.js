import React from "react"
import { mount, shallow } from "enzyme"
import toJson from "enzyme-to-json"
import "jest-styled-components"
import Tabs from "./Tabs"

describe("Tabs", () => {
  const props = {
    tabs: [
      {
        id: "tab1",
        header: "activity log",
        content: <span>sure!</span>,
        default: true,
      },
      {
        id: "tab2",
        header: "activity log 1",
        content: <span>wooow</span>,
      },
    ],
  }
  const component = shallow(<Tabs {...props} />)

  it("should match the snapshot",()=>{
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("render the default tab", () => {
    expect(component.find("button.selected").text()).toEqual("activity log")
    expect(component.find("span").text()).toEqual("sure!")
  })
  it("render the selected tab", () => {
    component.setState({ selected: "tab2" })
    expect(component.find("button.selected").text()).toEqual("activity log 1")
    expect(component.find("span").text()).toEqual("wooow")
  })

})
