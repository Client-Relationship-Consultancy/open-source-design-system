import React from "react"
import { mount } from "enzyme"
import toJson from "enzyme-to-json"
import HelperErrorMessage, { StyledErrorMessage, StyledHelperCaption } from "./HelperErrorMessage"
import "jest-styled-components"

describe("HelperErrorMessage Component Test", () => {
  const propsMock = {
    error: "error",
    caption: "caption",
    isError: false,
    isFocus: false,
  }
  const component = mount(<HelperErrorMessage {...propsMock} />)
  const StyledErrorMessageComponent = mount(<StyledErrorMessage>test</StyledErrorMessage>)
  const StyledHelperCaptionComponent = mount(<StyledHelperCaption>test</StyledHelperCaption>)

  it("HelperErrorMessage sould match last snapshot", () => {
    expect(
      component.contains(
        <StyledHelperCaption className="ErrorMessage">caption</StyledHelperCaption>,
      ),
    ).toBeFalsy()
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeFalsy()
    component.setProps({ ...propsMock, isFocus: true })
    expect(
      component.contains(
        <StyledHelperCaption className="ErrorMessage">caption</StyledHelperCaption>,
      ),
    ).toBeTruthy()
    component.setProps({ ...propsMock, isError: true })
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeTruthy()
  })

  it("StyledErrorMessage should match last snapshot", () => {
    const tree = toJson(StyledErrorMessageComponent)
    expect(tree).toMatchSnapshot()
  })

  it("StyledHelperCaption should match last snapshot", () => {
    const tree = toJson(StyledHelperCaptionComponent)
    expect(tree).toMatchSnapshot()
  })
})
