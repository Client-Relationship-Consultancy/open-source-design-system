/* eslint no-param-reassign: 0 */

import React from "react"

import { storiesOf } from "@storybook/react"

import { Menu } from "./Menu"

const stories = storiesOf("Menu", module)

stories.add("Menu", () => {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      <Menu
        items={[
          {
            label: "Exclude",
            onClick: () => console.log("Exclude me"),
          },
          {
            label: "Remove",
            onClick: () => console.log("remove me"),
          },
          {
            label: "Make Active",
            onClick: () => console.log("activate me"),
          },
        ]}
      />
    </div>
  )
})
