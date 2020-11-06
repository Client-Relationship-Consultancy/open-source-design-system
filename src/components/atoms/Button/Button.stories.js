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
  Primary: "primary",
  PrimaryOutline: "primaryOutline",
  SecondaryOutline: "secondaryOutline",
  Danger: "danger",
  Ghost: "ghost",
}

const iconPositions = {
  Before: "before",
  After: "after",
}

const iconSizes = {
  Medium: "medium",
  Large: "large",
}

const iconTypes = {
  Check: "check",
  DownArrow: "chevron-down",
  Times: "times",
  None: "",
}

stories.add("Button using icon library", () => (
  <NewButton
    buttonType={select("Type", buttonTypes, "secondaryOutline")}
    size={select("Size", buttonSizes, "large")}
    disabled={boolean("Disabled", false)}
    icon={select("Icon Type", iconTypes, "")}
    iconPosition={select("Icon Position", iconPositions, "before")}
    iconSize={select("Icon Size", iconSizes, "large")}
  >
    {text("Button Description", "Button")}
  </NewButton>
))

const selectArrowSvg = (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" strokeWidth="5" />
  </svg>
)

stories.add("Button passing SVG icon", () => (
  <NewButton
    buttonType={select("Type", buttonTypes, "secondaryOutline")}
    size={select("Size", buttonSizes, "large")}
    disabled={boolean("Disabled", false)}
    icon={selectArrowSvg}
    iconPosition={select("Icon Position", iconPositions, "before")}
    iconSize={select("Icon Size", iconSizes, "large")}
  >
    {text("Button Description", "Button")}
  </NewButton>
))
