import React from "react"

import { storiesOf } from "@storybook/react"
import { boolean } from "@storybook/addon-knobs"

import { Collapsible } from "../../../index"

const stories = storiesOf("Collapsible", module)

const collapsedContent = (
  <>
    <h1>Panel</h1>
    <p>This is some text to help explain what this panel is.</p>
    <p>
      <em>Click the arrow to show the hidden content...</em>
    </p>
  </>
)

const openContent = (
  <>
    <p>This is the hidden content you seek!</p>
    <p>This is the hidden content you seek!</p>
    <p>This is the hidden content you seek!</p>
    <p>This is the hidden content you seek!</p>
    <p>This is the hidden content you seek!</p>
  </>
)

stories.add("Collapsible", () => {
  const open = boolean("Open", false)
  const locked = boolean("Locked", false)

  return (
    <Collapsible
      open={open}
      locked={locked}
      collapsedContent={collapsedContent}
      clickHandler={() => console.log("clicked!")}
    >
      {openContent}
    </Collapsible>
  )
})
