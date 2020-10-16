import React from "react"
import { shallow } from "enzyme"
import Collapsible, {
  OpenContentContainerVisibility,
  OpenContentContainerMaxheight,
  OpenContentContainerOpacity,
  OpenContentContainerTransitionduration,
  OpenContentContainerTransitiondelay,
  OpenContentContainerTransitiontimingfunction,
  CollapsibleIconTransition,
} from "./Collapsible"

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

  it("test helper functions for style", () => {
    expect(OpenContentContainerVisibility({ open: true })).toBe("visible")
    expect(OpenContentContainerMaxheight({ open: true })).toBe("50rem")
    expect(OpenContentContainerOpacity({ open: true })).toBe(1)
    expect(OpenContentContainerTransitionduration({ open: true })).toBe("0.5s")
    expect(OpenContentContainerTransitiondelay({ open: true })).toBe("0")
    expect(OpenContentContainerTransitiontimingfunction({ open: true })).toBe("ease-in")
    expect(CollapsibleIconTransition({ open: true })).toBe("rotateZ(-180deg)")

    expect(OpenContentContainerVisibility({ open: false })).toBe("hidden")
    expect(OpenContentContainerMaxheight({ open: false })).toBe("0rem")
    expect(OpenContentContainerOpacity({ open: false })).toBe(0)
    expect(OpenContentContainerTransitionduration({ open: false })).toBe("0.5s")
    expect(OpenContentContainerTransitiondelay({ open: false })).toBe("0.5s")
    expect(OpenContentContainerTransitiontimingfunction({ open: false })).toBe("ease-out")
    expect(CollapsibleIconTransition({ open: false })).toBe("rotateZ(0deg)")
  })
})
