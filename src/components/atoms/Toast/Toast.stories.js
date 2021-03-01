import React from "react"
import { storiesOf } from "@storybook/react"
// import { boolean } from "@storybook/addon-knobs"
import { Toast } from "../../../index"

const stories = storiesOf("Toast", module)

stories.add("Standard style", context => {
    const props = "";
  
    Object.assign(context, props)
  
    return (
      <Toast visible>
        <div>
            <p>Sorry, we weren’t able to save your changes. Please try saving again</p>
        </div>
      </Toast>
    )
  })