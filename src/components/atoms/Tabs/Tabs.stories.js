import React from "react"
import { storiesOf } from "@storybook/react"
import { text, boolean } from "@storybook/addon-knobs"

import Tabs from "./Tabs"

const stories = storiesOf("Tabs", module)

stories.add("Tabs", () => {
  return (
    <div style={{ paddingBottom: "5rem", width: "400px" }}>
      <Tabs
        tabs={[
          {
            id: "tab1",
            header: "activity log",
            content: <div>sure!</div>,
            default: true,
          },
          {
            id: "tab2",
            header: "activity log 1",
            content: <div>wooow</div>,
          },
        ]}
      />
    </div>
  )
})
