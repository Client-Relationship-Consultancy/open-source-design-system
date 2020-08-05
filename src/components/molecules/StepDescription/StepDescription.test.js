import React from "react"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import StepDescription from "./StepDescription"

describe("StepDescription Component Testing", () => {
  const steps = [
    { order: 1, text: "Step 1 Text" },
    { order: 2, text: "Step 2 Text" },
    { order: 3, text: "Step 3 Text" },
  ]

  const component = shallow(<StepDescription steps={steps} />)
  const componentStyle = mount(<StepDescription steps={steps} />)

  it("Should render the correct amount of steps", () => {
    expect(component.find("StepWrapper").length).toEqual(steps.length)
  })

  it("should match snapshot when the stepTopFlexAlignment prop is passed", () => {
    const componentStyleWithProp = mount(
      <StepDescription steps={steps} stepTopFlexAlignment="center" />,
    )

    expect(componentStyleWithProp).toMatchSnapshot()
  })

  it("should match snapshot for styling", () => {
    expect(componentStyle).toMatchSnapshot()
  })
})
