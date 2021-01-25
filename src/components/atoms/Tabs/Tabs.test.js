import React from "react"
import { mount, shallow } from "enzyme"
import toJson from "enzyme-to-json"
import "jest-styled-components"
import Tabs, { StyledTabs, getDefaultTabId } from "./Tabs"

describe("Tabs", () => {
  const propsWithoutDefault = {
    tabs: [
      {
        id: "tab1",
        header: "activity log",
        content: <span>sure!</span>,
      },
      {
        id: "tab2",
        header: "activity log 1",
        content: <span>wooow</span>,
      },
    ],
  }
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

  it("should match the snapshot", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("StyledTabs should match the snapshot", () => {
    const StyledTabsShallow = mount(
      <StyledTabs
        theme={{
          surface: { hex: "mockColorsurface" },
          black: { main: { hex: "mockColorblack" } },
          action: { main: { hex: "mockColoraction" } },
        }}
      >
        <button className="selected" type="button">
          tab
        </button>
      </StyledTabs>,
    )
    const tree = toJson(StyledTabsShallow)
    expect(tree).toMatchSnapshot()
  })

  it("render the default tab", () => {
    expect(component.find("button.selected").text()).toEqual("activity log")
    expect(component.find("span").text()).toEqual("sure!")
    expect(component.find("span").text()).not.toEqual("wooow")
  })
  
  it("render the selected tab", () => {
    component.instance().selectTab("tab2")
    expect(component.find("button.selected").text()).toEqual("activity log 1")
    expect(component.find("span").text()).toEqual("wooow")
    expect(component.find("span").text()).not.toEqual("sure!")
  })

  it("getSelectedTabContent return undefined if no tab is selected", () => {
    component.setState({ selected: "not available" })
    expect(component.instance().getSelectedTabContent()).toEqual("No content found under this tab")
  })

  it("getDefaultTabId should return the correct starting tab if default is available", () => {
    expect(getDefaultTabId(props.tabs)).toEqual(props.tabs[0].id)
  })

  it("getDefaultTabId should return the correct starting tab if default is not available", () => {
    expect(getDefaultTabId(propsWithoutDefault.tabs)).toEqual(propsWithoutDefault.tabs[0].id)
  })

  it("should return the first tab selected if no tab has default set to true", () => {
    
    const componentMock = shallow(<Tabs {...propsWithoutDefault} />)
    expect(componentMock.find("button.selected").text()).toEqual("activity log")
    expect(componentMock.find("span").text()).toEqual("sure!")
  })
})
