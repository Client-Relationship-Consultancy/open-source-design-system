import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { text } from "@storybook/addon-knobs"

import { ConfirmationModal } from "../../../index"

const ExampleText = styled.h3`
  font-size: 20px;
  font-weight: 400;
`

storiesOf("Modals", module).add("Confirmation Modal", () => (
  <ConfirmationModal
    isOpen
    yesButtonLabel={text("Yes button label", "Yes")}
    noButtonLabel={text("No button label", "No")}
  >
    <ExampleText>Are you sure you would like to delete these entries?</ExampleText>
  </ConfirmationModal>
))
