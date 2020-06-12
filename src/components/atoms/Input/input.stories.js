import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import Input from "./Input"
import Icon from "../Icon"

const NewIcon = styled(Icon)`
  font-size: 1rem;
`

const stories = storiesOf("Input", module)

stories.add("Standard", context => {
  return <Input bgColor="#F5F5F5" placeholder="Search the table..." />
})

stories.add("With Icon", context => {
  return <Input placeholder="Search the table..." bgColor="#F5F5F5" icon={<NewIcon name="search" color="primary" />} />
})

stories.add("With custom onFocus", context => {
  return <Input bgColor="#F5F5F5" onFocus={() => console.log("hello world")} />
})
