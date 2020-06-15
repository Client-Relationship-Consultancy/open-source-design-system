import React from "react"
import { storiesOf } from "@storybook/react"
import Input from "./Input"
import Icon from "../Icon"

const stories = storiesOf("Input", module)

stories.add("Standard", context => {
  return <Input bgColor="#F5F5F5" placeholder="Search the table..." />
})

stories.add("With Icon", context => {
  return <Input placeholder="Search the table..." bgColor="#F5F5F5" icon="search" />
})

stories.add("With bottom border", context => {
  const Placeholder = () => <span>hello</span>
  return <Input border="bottom" placeholder={<Placeholder />} />
})

stories.add("With icon and bottom border", context => {
  return <Input icon="search" border="bottom" />
})

stories.add("With all border", context => {
  return <Input bgColor="#F5F5F5" border="all" />
})

stories.add("With icon and all border", context => {
  return <Input bgColor="#F5F5F5" border="all" icon="search" />
})

stories.add("With custom onFocus", context => {
  return <Input bgColor="#F5F5F5" onFocus={() => console.log("hello world")} />
})

stories.add("With custom Icon", context => {
  return <Input bgColor="#F5F5F5" icon={<Icon name="check" />} />
})
