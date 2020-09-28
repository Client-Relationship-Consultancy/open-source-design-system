import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text, number, boolean, select } from "@storybook/addon-knobs"

import { Button } from "../../../index"
import NewButton from "./Buttons"

const stories = storiesOf("Buttons", module)

const themeDropdown = {
  default: "default",
  ghost: "ghost",
  outline: "outline",
  complimentary: "complimentary",
  error: "error",
}

stories.add("Save icon button", () => (
  <Button
    className={text("", "small", "xsmall")}
    icon={text("", "Icon Name", "plus-circle")}
    onClick={action("clicked")}
    size={number("Size", 1.5)}
    buttonType={select("button type", themeDropdown, "default")}
    isDisabled={boolean("Disabled", false)}
  >
    {text("Button Description", "Save")}
  </Button>
))

const buttonSizes = {
  Small: "small",
  Medium: "medium",
  Large: "large",
}

const buttonTypes = {
  Default: "default",
  Outline: "outline",
  Complimentary: "complimentary",
  Ghost: "ghost",
  Error: "error",
}

stories.add("Button styles", () => (
  <NewButton
    buttonType={select("Type", buttonTypes, "default")}
    size={select("Size", buttonSizes, "medium")}
  >
    {text("Button Description", "Save")}
  </NewButton>
))
