import React from "react"

import { storiesOf } from "@storybook/react"

import { Accordion } from "../../../index"

const stories = storiesOf("Accordion", module)

const content = [
  {
    collapsedContent: <h1>Collapsed Content 1</h1>,
    openContent: <p>Open Content 1</p>,
  },
  {
    collapsedContent: <h1>Collapsed Content 2</h1>,
    openContent: <p>Open Content 2</p>,
  },
  {
    collapsedContent: <h1>Collapsed Content 3</h1>,
    openContent: <p>Open Content 3</p>,
  },
]

stories.add("Accordion with three panels", () => {
  const open = [0]
  const locked = [2]

  const clickHandler = (event) => {
    const { index } = event.currentTarget.dataset
    const existingIndex = open.findIndex((val) => val === index)

    if (existingIndex > -1) open.splice(index, 1)
    else if (!locked.includes(index)) open.push(index)
  }

  return <Accordion open={open} locked={locked} content={content} clickHandler={clickHandler} />
})
