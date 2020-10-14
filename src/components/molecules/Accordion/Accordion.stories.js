import React from "react"

import { storiesOf } from "@storybook/react"

import { Accordion } from "../../../index"

const stories = storiesOf("Accordion", module)

const openContent = (
  <>
    <h2>Open Content</h2>
    <p>This is some high quality open content</p>
    <p>It&apos;s even got a button:</p>
    <button type="button" onClick={() => null}>
      I don&apos;t actually do anything though :)
    </button>
  </>
)

const content = [
  {
    collapsedContent: (
      <>
        <h1>Collapsed Content 1</h1>
        <p>If you click the arrow on the right, you&apos;ll see the hidden content!</p>
      </>
    ),
    openContent,
  },
  {
    collapsedContent: (
      <>
        <h1>Collapsed Content 2</h1>
        <p>If you click the arrow on the right, you&apos;ll see the hidden content!</p>
      </>
    ),
    openContent,
  },
  {
    collapsedContent: (
      <>
        <h1>Collapsed Content 3</h1>
        <p>Clicking the arrow won&apos;t open me unless you unlock me first</p>
      </>
    ),
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
