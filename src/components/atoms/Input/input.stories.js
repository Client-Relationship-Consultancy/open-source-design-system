import React from "react"
import { storiesOf } from "@storybook/react"
import Input from "./Input"
import Icon from "../Icon"

const stories = storiesOf("Input", module)

stories.add("Standard", context => {
  return (
    <Input />
  )
})

stories.add("With Icon", context => {
  return (
    <Input icon={<Icon name="search"/>} />
  )
})
