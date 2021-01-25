import React from "react"
import { storiesOf } from "@storybook/react"
import { text, boolean } from "@storybook/addon-knobs"

import Tabs from "./Tabs"

const VeryLongContent = (
  <div>
    <div>sure 1!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
    <div>sure!</div>
  </div>
)

const stories = storiesOf("Tabs", module)

stories.add("Tabs", () => {
  return (
    <div style={{ paddingBottom: "5rem", width: "400px", height:"300px", overflowY:"scroll" }}>
      <Tabs
        tabs={[
          {
            id: "tab1",
            header: "activity log",
            content: VeryLongContent ,
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
