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
  let component = mount(<HelperErrorMessage {...propsMock} />)
  beforeEach(()=>{
    component = mount(<HelperErrorMessage {...propsMock} />)
  })

  it("HelperErrorMessage should should show a caption message when isFocus is true", () => {
    expect(
      component.contains(
        <StyledHelperCaption className="ErrorMessage">caption</StyledHelperCaption>,
      ),
    ).toBeFalsy()
    component.setProps({ ...propsMock, isFocus: true })
    expect(
      component.contains(
        <StyledHelperCaption className="ErrorMessage">caption</StyledHelperCaption>,
      ),
    ).toBeTruthy()
  })
  it("HelperErrorMessage should show an error message when isError is true", () => {
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeFalsy()
    component.setProps({ ...propsMock, isError: true })
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeTruthy()
  })

  it("HelperErrorMessage should show an error message while not showing the caption when isError is true and isFocus is true", () => {
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeFalsy()
    component.setProps({ ...propsMock, isError: true, isFocus: true })
    expect(
      component.contains(<StyledErrorMessage className="ErrorMessage">error</StyledErrorMessage>),
    ).toBeTruthy()
    expect(
      component.contains(
        <StyledHelperCaption className="ErrorMessage">caption</StyledHelperCaption>,
      ),
    ).toBeFalsy()
  })

  it("StyledErrorMessage should match last snapshot", () => {
    const StyledErrorMessageComponent = mount(<StyledErrorMessage>test</StyledErrorMessage>)
    const tree = toJson(StyledErrorMessageComponent)
    expect(tree).toMatchSnapshot()
  })

  it("StyledHelperCaption should match last snapshot", () => {
    const StyledHelperCaptionComponent = mount(<StyledHelperCaption>test</StyledHelperCaption>)
    const tree = toJson(StyledHelperCaptionComponent)
    expect(tree).toMatchSnapshot()
  })
})
