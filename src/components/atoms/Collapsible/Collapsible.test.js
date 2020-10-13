import React from "react"
import { shallow } from "enzyme"
import Collapsible from "./Collapsible"

describe("Collapsible Component Test", () => {
  const mockCollapsedContent = (
    <>
      <h1>Mock Panel Header</h1>
      <p>Mock text that explains what this panel does</p>
    </>
  )

  const mockOpenContent = (
    <>
      <p>Mock text that is shown/hidden</p>
      <p>Mock text that is shown/hidden</p>
      <p>Mock text that is shown/hidden</p>
      <p>Mock text that is shown/hidden</p>
      <p>Mock text that is shown/hidden</p>
    </>
  )

  const component = shallow(
    <Collapsible
      open
      locked={false}
      collapsedContent={mockCollapsedContent}
      clickHandler={() => null}
    >
      {mockOpenContent}
    </Collapsible>,
  )

  it("Match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })
})
