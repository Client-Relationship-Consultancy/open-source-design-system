import React from "react"
import { storiesOf } from "@storybook/react"
import { boolean, text } from "@storybook/addon-knobs"
import LuggageLabel from "./LuggageLabel"

const stories = storiesOf("LuggageLabel", module)
stories.add("Default Style", context => {
  const info = {
    description: "A luggage label which has a view and edit mode.",
    dos: ["Use this for unit policies"],
    donts: [
      "The indentation on the left isn't displayed properly if text wraps across more than one line (so avoid this scenario).",
    ],
  }
  Object.assign(context, info)

  return (
    <LuggageLabel
      onClick={() => {
        window.alert("You can pass a function to me!") // eslint-disable-line
      }}
      editMode={boolean("Toggle edit mode", false)}
    >
      {text("Label", "Luggage")}
    </LuggageLabel>
  )
})
