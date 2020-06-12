import React from "react"
import { storiesOf } from "@storybook/react"
import Input from "./Input"

const stories = storiesOf("Input", module)

stories.add("Standard style", context => {
  const text = {
    description: [
      "The Card compoennt style is simple and clear to help bring its contents forward. Cards are the top level container of most components.",
      "This component doesn't have to have a header or footer.",
    ],
    dos: [
      "Use this component as a top level wrapper",
      "Only use the footer for placing buttons and interactive elements",
      "Buttons can be placed in the body as well as the footer",
      "Do make sure the content are all aligned",
      "Do use the box shadow option when the Card is on a white background",
    ],
    donts: [
      "Do not nest Card components within each other",
      "Do not use the box shadow option when on a coloured background",
    ],
  }

  Object.assign(context, text)

  return (
  <div>
    <Input />
  </div>
  )
})
