/* eslint-disable */
import React from "react"
import { storiesOf } from "@storybook/react"
import { ListFilter } from "../../../index"

const stories = storiesOf("List", module)

const options = [
  "Ahsa",
  "ab",
  "àb",
  "Bhsd",
  "bhas",
  "àpple",
  "apple",
  "abple",
  "Apple",
  "10Banana Boat",
  "1Crab",
  "2Dog",
  "Super Book",
  "Anaconda",
  "Boat",
  "Amazonzzz",
]

const formattedOptions = options.map((item,index) => {
  const itemKey = item
    .toLowerCase()
    .trim()
    .split(" ")
    .join("-")

  return {
    key: item,
    id: index,
    value: (
      <div
        data-item={itemKey}
        onClick={(event) => console.log(event.target.getAttribute("data-item"))}
      >
        {item}
      </div>
    ),
  }
})

stories.add("Filterable List", context => {
  const text = {
    description: [
      "This is a list component with a built in search filter. It is built to be customisable with the options of having the default stylising.",
      "You need to pass an array of objects to this component for it to render the list. The object should have two keys, 'key' and 'value'. The key needs to be unique and the value can take in a string or a JSX element.",
      "The component can recieve a custom error message, which can be a JSX element or a string. This is shown when no results are found.",
    ],
  }
  Object.assign(context, text)
  return <ListFilter endingLine={false} items={formattedOptions} border />
})
