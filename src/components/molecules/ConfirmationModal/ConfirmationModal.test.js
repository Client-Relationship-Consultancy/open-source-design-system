import React from "react"
import { shallow, mount } from "enzyme"
import ConfirmationModal, { HeaderBar } from "./ConfirmationModal"
import "jest-styled-components"

describe("ConfirmationModal Component Test", () => {
  it("Match last snapshot", () => {
    const component = shallow(
      <ConfirmationModal isOpen>I am a lovely confirmation modal</ConfirmationModal>,
    )
    expect(component).toMatchSnapshot()
  })

  it("check function in styled components", () => {
    const headerBar = mount(<HeaderBar />)
    expect(headerBar).toMatchSnapshot()
  })

  it("should show 'Yes' and 'No' when no custom button label is passed", () => {
    const component = shallow(
      <ConfirmationModal isOpen>I am a lovely confirmation modal</ConfirmationModal>,
    )

    expect(component.find("ButtonText.yesButton").text()).toEqual("Yes")
    expect(component.find("ButtonText.noButton").text()).toEqual("No")
  })

  it("should accept a string/JSX message for the yes button", () => {
    const component = shallow(
      <ConfirmationModal isOpen yesButtonLabel="I like to confirm">
        I am a lovely confirmation modal
      </ConfirmationModal>,
    )

    expect(component.find("ButtonText.yesButton").text()).toEqual("I like to confirm")

    const YesJSX = () => <div>Confirm</div>
    component.setProps({ yesButtonLabel: <YesJSX /> })
    expect(component.find("ButtonText.yesButton").contains(<YesJSX />)).toEqual(true)
  })

  it("should accept a string/JSX message for the no button", () => {
    const component = shallow(
      <ConfirmationModal isOpen noButtonLabel="Cancel">
        I am a lovely confirmation modal
      </ConfirmationModal>,
    )

    expect(component.find("ButtonText.noButton").text()).toEqual("Cancel")

    const NoJSX = () => <div>Nope</div>
    component.setProps({ noButtonLabel: <NoJSX /> })
    expect(component.find("ButtonText.noButton").contains(<NoJSX />)).toEqual(true)
  })
})
