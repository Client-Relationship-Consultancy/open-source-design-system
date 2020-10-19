import React from "react"

import { configure, addDecorator } from "@storybook/react"
import { withOptions } from "@storybook/addon-options"
import { withInfo } from "@storybook/addon-info"
import { withKnobs } from "@storybook/addon-knobs"
import "@storybook/addon-console"

import "../src/stories/storybook.css"
import { colourPalette } from "../src/brandColours"
import { PropTable as TableComponent } from "../src/stories/components/PropTable"
import { GlobalContainer } from "../src/stories/components/GlobalContainer"

const { background, black, white, surface } = colourPalette.examplePalette

// Globally add addon to stories: Info Addon
addDecorator(
  withInfo({
    header: false, // Hide default Header - using custom header
    inline: true, // Make info addon appear inline instead of in a modal
    maxPropStringLength: 50, // Maximum string length in source code
    maxPropObjectKeys: 5, // Maximum number of keys in objects/arrays
    maxPropsIntoLine: 5, // Maximum nummber of props in a line in source code
    TableComponent, // Apply new template for the prop table
    // Add custom styling
    styles: (stylesheet) => {
      return {
        // Pull in existing stylesheet
        ...stylesheet,
        // Style the main body
        infoBody: {
          ...stylesheet.infoBody,
          padding: "0",
          margin: "0",
          border: "none",
          backgroundColor: background.hex,
        },
        // Style the storybook component
        infoStory: {
          ...stylesheet.infoStory,
          border: `1px solid ${black.tint40.hex}`,
          marginBottom: "2rem",
          borderRadius: "10px",
          padding: "2rem 2rem",
          backgroundColor: surface.hex,
        },
        // Style the source heading
        source: {
          ...stylesheet.source,
          h1: {
            ...stylesheet.source.h1,
            lineHeight: "normal",
            padding: "0",
            fontSize: "1.125rem",
            margin: "0 0 0.5rem",
            borderBottom: `1px solid ${black.main.hex}`,
          },
        },
        propTableHead: {
          fontSize: "1rem",
          margin: "0 0 0.5rem",
        },
      }
    },
  }),
)

// Globally add addon to stories: Knobs addon
addDecorator(withKnobs)

// Configure storybook options
addDecorator(
  withOptions({
    name: "CRC Design System", // Name that appears on the top left of storybook
    addonPanelInRight: true, // Have addon panel appear on right instead of below
  }),
)

// Add a global wrapper to the stories
addDecorator((storybook) => {
  // Grabs the values from the individual stories
  // 'kind' and 'story' are default values
  // The other values are set in the stories
  const { kind, story, description, dos, donts } = storybook().props.context

  return (
    <GlobalContainer
      title={kind}
      componentName={story}
      description={description}
      dos={dos}
      donts={donts}
    >
      {storybook()}
    </GlobalContainer>
  )
})

// Grabs every file that ends in '.stories.js' in the /stories and src/components dir
const components = require.context("../src/components", true, /\.stories\.(js|tsx)$/)
const stories = require.context("../src/stories", true, /\.stories\.(js|tsx)$/)

// Loads the stories into storybook
function loadStories() {
  components.keys().forEach((filename) => components(filename))
  stories.keys().forEach((filename) => stories(filename))
}

configure(loadStories, module)
