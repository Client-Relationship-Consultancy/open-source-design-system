import React from "react"

import { storiesOf } from "@storybook/react"
import { text, boolean, select } from "@storybook/addon-knobs"

import Button from "./Button"
import IconButton from "./IconButton/IconButton"

const stories = storiesOf("Buttons", module)

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

stories.add("Button with icon options", () => {
  return (
    <Button
      buttonType={select("Button Type", buttonTypes, "primary")}
      buttonSize={select("Button Size", buttonSizes, "large")}
      disabled={boolean("Disabled", false)}
      icon={select("Icon Type", iconTypes, "")}
      iconPosition={select("Icon Position", iconPositions, "before")}
      iconSize={select("Icon Size", iconSizes, "large")}
    >
      {text("Button Description", "Button")}
    </Button>
  )
})

const selectArrowSvg = (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" strokeWidth="5" />
  </svg>
)

stories.add("Button using passed SVG icon", () => {
  return (
    <Button
      buttonType={select("Button Type", buttonTypes, "secondaryOutline")}
      buttonSize={select("Button Size", buttonSizes, "large")}
      disabled={boolean("Disabled", false)}
      icon={selectArrowSvg}
      iconPosition={select("Icon Position", iconPositions, "before")}
      iconSize={select("Icon Size", iconSizes, "large")}
    >
      {text("Button Description", "Button")}
    </Button>
  )
})

stories.add("Icon only button", () => {
  return (
    <IconButton
      buttonType={select("Button Type", buttonTypes, "secondaryOutline")}
      buttonSize={select("Button Size", buttonSizes, "large")}
      disabled={boolean("Disabled", false)}
      icon={select("Icon Type", iconTypes, "times")}
    >
      HA! You tried passing in text, expecting it to be used as a label; what folly!
    </IconButton>
  )
})
