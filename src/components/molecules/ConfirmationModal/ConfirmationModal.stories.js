import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { text } from "@storybook/addon-knobs"

import { ConfirmationModal } from "../../../index"



storiesOf("Modals", module)
  .add("Confirmation Modal without Title", () => (
    <ConfirmationModal
      isOpen
      yesButtonLabel={text("Yes button label", "Button")}
      noButtonLabel={text("No button label", "Cancel")}
    >
      This is some more text as I can’t move the original text.
      <br />
      <br />
      You have clicked on another user whilst still in progress of editing the permissions of
      Bethany B. If you change users now you will lose the current changes you have made.
      <br />
      <br />
      Are you sure want to switch to another user?
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
      Are you sure want to switch to another user?
    </ConfirmationModal>
  ))
