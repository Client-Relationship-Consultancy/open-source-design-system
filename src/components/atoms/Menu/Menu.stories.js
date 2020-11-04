/* eslint no-param-reassign: 0 */

import React from "react"

import { storiesOf } from "@storybook/react"

import { Menu } from "./Menu"

const stories = storiesOf("Menu", module)

stories.add("Menu", () => {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      <Menu />
    </div>
  )
})
