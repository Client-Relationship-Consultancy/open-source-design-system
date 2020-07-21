import React from "react"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import "jest-styled-components"
import Panel, { PanelButton, ArrowIcon } from "./Panel"

describe("Panel", () => {
    const commonProps = {
        defaultOpen: false,
        label: "open/close",
    }
    const childProp = <p>Mock Content</p>;
    
    it("should match the snapshot when no icon passed", () => {
        const componentWithoutChild = shallow(<Panel {...commonProps}>{childProp}</Panel>)
        const tree = toJson(componentWithoutChild)
        expect(tree).toMatchSnapshot()
    })
    it("should match the snapshot when icon passed", () => {
        const customProps = {...commonProps, icon: "check"}
        const componentWithoutChild = shallow(<Panel {...customProps}>{childProp}</Panel>)
        const tree = toJson(componentWithoutChild)
        expect(tree).toMatchSnapshot()
    })
    it("should open when the button is clicked", () => {
        const customProps = {...commonProps, icon: "check"}
        const componentWithChild = shallow(<Panel {...customProps}>{childProp}</Panel>)
        expect(componentWithChild.state().open).toEqual(false)
        componentWithChild.find("PanelButton").simulate("click")
        expect(componentWithChild.state().open).toEqual(true)
        expect(componentWithChild.find("p").exists()).toEqual(true)
    })
})
describe("PanelButton", () => {
    it("uses the correct colours", () => {
        const component = mount(<PanelButton />)
        expect(component).toHaveStyleRule("color", "#743C8F")
        expect(component).toHaveStyleRule("fill", "#743C8F", { modifier: "path"})
    })
})
describe("ArrowIcon", () => {
    it("uses the correct scale styling when flipped is false", () => {
        const component = mount(<ArrowIcon name="chevron-down" size="1x" flipped={false}/>)
        expect(component).toHaveStyleRule("transform", "scaleY(1)", { modifier: "svg"})
    })
    it("uses the correct scale styling when flipped is true", () => {
        const component = mount(<ArrowIcon name="chevron-down" size="1x" flipped/>)
        expect(component).toHaveStyleRule("transform", "scaleY(-1)", { modifier: "svg"})
    })
})
