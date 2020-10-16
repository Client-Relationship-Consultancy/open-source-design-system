import React from "react"

import { storiesOf } from "@storybook/react"

import { Accordion } from "../../../index"

const stories = storiesOf("Accordion", module)

const openContent = (
  <div style={{ padding: "0.5rem 1rem" }}>
    <h2 style={{ marginTop: "0px" }}>Open Content</h2>
    <p>This is some high quality open content</p>
    <p>It&apos;s even got a button:</p>
    <button type="button" onClick={() => null}>
      I don&apos;t actually do anything though :)
    </button>
  </div>
)

const collapsedContent = (
  <div style={{ padding: "0.5rem 1rem" }}>
    <h1>Collapsed Content</h1>
    <p>If you click the arrow on the right, you&apos;ll see the hidden content!</p>
  </div>
)

const content = [
  {
    collapsedContent,
    openContent,
  },
  {
    collapsedContent,
    openContent,
  },
  {
    collapsedContent: (
      <div style={{ padding: "0.5rem 1rem" }}>
        <h1>Collapsed Content</h1>
        <p>Clicking the arrow won&apos;t open me unless you unlock me first</p>
      </div>
    ),
    openContent,
  },
  {
    collapsedContent: undefined,
    openContent,
  },
]

class MockAccordionParent extends React.Component {
  state = {
    openPanels: [0],
    lockedPanels: [2],
  }

  updateOpenAccordionPanels = (updatedOpenPanels) => {
    this.setState({ openPanels: updatedOpenPanels })
  }

  render() {
    return (
      <Accordion
        open={this.state.openPanels}
        locked={this.state.lockedPanels}
        content={content}
        updateOpenPanels={this.updateOpenAccordionPanels}
      />
    )
  }
}

stories.add("Accordion with three panels", () => {
  return <MockAccordionParent />
})
