import React from "react"
import { storiesOf } from "@storybook/react"

import { text, select } from "@storybook/addon-knobs"

import { FileInput } from "../../../index"

const stories = storiesOf("FileInput", module)

stories.add("Logo or file input", () => {
  const themeDropdown = {
    default: "default",
    ghost: "ghost",
    outline: "outline",
    error: "error",
    complimentary: "complimentary",
  }

  return (
    <FileInput
      handleUpload={() => console.warn("Uploading file...")} // eslint-disable-line no-console
      uploadMessage={text("Upload Message", "Upload")}
      chooseFileMessage={text("Choose File Message", "Choose file...")}
      theme={select("button type", themeDropdown, "outline")}
    />
  )
})
