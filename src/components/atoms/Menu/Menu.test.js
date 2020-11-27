import React from "react"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import { Menu, StyledMenu, MenuLabel, SubMenu, SubMenuItems } from "./Menu"

describe("Menu Component", () => {
  const commonProps = {
    items: [
      { label: "Exclude me", id: "exclude", onClick: jest.fn(), icon: "users" },
      { label: "Remove me", onClick: jest.fn(), icon: <svg /> },
      { label: "Activate me", id: "activate", onClick: jest.fn() },
    ],
  }

  let component
  beforeEach(() => {
    document.addEventListener = jest.fn()
    document.removeEventListener = jest.fn()

    component = shallow(<Menu {...commonProps}>Hello</Menu>)
  })

  it("should match snapshot", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("should render the arrow icon if showMenuArrow is true", () => {
    const dropdownIcon = component.find("Icon[name='chevron-down']")
    expect(dropdownIcon.exists()).toEqual(true)
    expect(dropdownIcon.length).toEqual(1)
  })

  it("should not render the arrow icon if showMenuArrow is false", () => {
    component.setProps({ showMenuArrow: false })
    const dropdownIcon = component.find("Icon[name='chevron-down']")
    expect(dropdownIcon.exists()).toEqual(false)
  })

  it("should toggle the showSubMenu state when the button is clicked", () => {
    expect(component.state()).toEqual({
      showSubMenu: false, // false by default
    })

    component.simulate("click")
    expect(component.state()).toEqual({
      showSubMenu: true,
    })

    component.simulate("click")
    expect(component.state()).toEqual({
      showSubMenu: false,
    })
  })

  it("should toggle the showSubMenu state when openSubMenu is called", () => {
    expect(component.state()).toEqual({
      showSubMenu: false, // false by default
    })

    component.instance().openSubMenu()
    expect(component.state()).toEqual({
      showSubMenu: true,
    })

    component.instance().openSubMenu()
    expect(component.state()).toEqual({
      showSubMenu: false,
    })
  })

  it("should close the menu when the current component ref returns false as it does not contain the event target", () => {
    component.setState({ showSubMenu: true })
    expect(component.state()).toEqual({ showSubMenu: true })

    const mockContains = jest.fn(() => false)
    component.instance().componentRef = {
      current: { contains: mockContains },
    }

    const mockMouseEvent = {
      target: null,
    }
    component.instance().closeMenuWhenClickedOutside(mockMouseEvent)
    expect(mockContains).toHaveBeenCalledWith(null)
    expect(component.state()).toEqual({ showSubMenu: false })
  })

  it("should leave the menu open when the current component ref returns true as it does contain the event target", () => {
    component.setState({ showSubMenu: true })
    expect(component.state()).toEqual({ showSubMenu: true })

    const mockContains = jest.fn(() => true)
    component.instance().componentRef = {
      current: { contains: mockContains },
    }

    const mockMouseEvent = {
      target: <div />,
    }
    component.instance().closeMenuWhenClickedOutside(mockMouseEvent)
    expect(mockContains).toHaveBeenCalledWith(<div />)
    expect(component.state()).toEqual({ showSubMenu: true })
  })

  it("should add the event listener when the component mounts", () => {
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousedown",
      component.instance().closeMenuWhenClickedOutside,
    )
  })

  it("should remove the event listener when the component unmounts", () => {
    const eventListener = component.instance().closeMenuWhenClickedOutside
    component.unmount()
    expect(document.removeEventListener).toHaveBeenCalledWith("mousedown", eventListener)
  })

  it("should use the ref prop when useInnerRef prop is false", () => {
    component.setProps({
      useInnerRef: false,
    })
    expect(component.instance().createRefProp()).toEqual({
      ref: component.instance().componentRef,
    })
  })

  it("should use the innerRef prop when useInnerRef prop is true", () => {
    component.setProps({
      useInnerRef: true,
    })
    expect(component.instance().createRefProp()).toEqual({
      innerRef: component.instance().componentRef,
    })
  })
})

describe("StyledMenu component", () => {
  let component
  beforeEach(() => {
    const mockTheme = { action: { main: { hex: "mockHexValue" } } }
    component = mount(<StyledMenu showSubMenu theme={mockTheme} />)
  })

  it("should match snapshot", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})

describe("MenuLabel component", () => {
  it("should match snapshot", () => {
    const component = mount(<MenuLabel />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})

describe("SubMenu component", () => {
  let component
  beforeEach(() => {
    const mockTheme = {
      surface: { hex: "mockSurfaceHex" },
      black: { tint40: { hex: "mockBlackTint40" } },
    }
    component = mount(<SubMenu showSubMenu theme={mockTheme} />)
  })

  it("should match snapshot", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("should set opacity to be 1 and visibility to visible when showSubMenu is true", () => {
    expect(component).toHaveStyleRule("visibility", "visible")
    expect(component).toHaveStyleRule("opacity", "1")
  })

  it("should set opacity to be 1 and visibility to hidden when showSubMenu is true", () => {
    component.setProps({ showSubMenu: false })
    expect(component).toHaveStyleRule("opacity", "0")
    expect(component).toHaveStyleRule("visibility", "hidden")
  })
})

describe("SubMenuItems component", () => {
  const mockTheme = {
    black: { tint80: { hex: "mockBlackTint80" }, tint20: { hex: "mockBlackTint20" } },
  }
  it("should match snapshot", () => {
    const component = mount(<SubMenuItems showSubMenu theme={mockTheme} />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
