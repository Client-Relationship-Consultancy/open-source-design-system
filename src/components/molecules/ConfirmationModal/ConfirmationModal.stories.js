import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { text } from "@storybook/addon-knobs"

import { ConfirmationModal } from "../../../index"

const OverflowContent = styled.div`
  position:relative;
  div {
    position:absolute;
    top:0;
    left:0;
    width:80px;
    height:200px;
    display:block;
    background-color:black;
    color:white;
    border:3px solid coral;
  }
`

storiesOf("Modals", module)
  .add("Confirmation Modal without Title", () => (
    <ConfirmationModal
      isOpen
      yesButtonLabel={text("Yes button label", "Button")}
      noButtonLabel={text("No button label", "Cancel")}
    >
      Without a title, we can have text here also.
      <br />
      <br />
      You have clicked on another user whilst still in progress of editing the permissions of
      Bethany B. If you change users now you will lose the current changes you have made.
      <br />
      <br />
      <b>Are you sure want to switch to another user?</b>
    </ConfirmationModal>
  ))
  .add("Confirmation Modal with Title", () => (
    <ConfirmationModal
      isOpen
      yesButtonLabel={text("Yes button label", "Button")}
      noButtonLabel={text("No button label", "Cancel")}
      title="Title of the modal"
    >
      You have clicked on another user whilst still in progress of editing the permissions of
      Bethany B. If you change users now you will lose the current changes you have made.
      <br />
      <br />
      <b>Are you sure want to switch to another user?</b>
    </ConfirmationModal>
  ))
  .add("Confirmation Modal without Title with content overflow", () => (
    <ConfirmationModal
      isOpen
      yesButtonLabel={text("Yes button label", "Button")}
      noButtonLabel={text("No button label", "Cancel")}
    >
      Without a title, we can have text here also.
      <br />
      <br />
      You have clicked on another user whilst still in progress of editing the permissions of
      Bethany B. If you change users now you will lose the current changes you have made.
      <br />
      <br />
      <b>Are you sure want to switch to another user?</b>
      <OverflowContent>
        <div>
          woooow
          <br />
          <br />
          woooow
          <br />
          <br />
          woooow
          <br />
          <br />
          woooow
          <br />
          <br />
          woooow
          <br />
          <br />
          woooow
        </div>
      </OverflowContent>
    </ConfirmationModal>
  ))