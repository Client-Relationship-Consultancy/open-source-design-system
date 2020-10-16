import React from "react"
import { shallow } from "enzyme"
import Accordion , { accordionWidthCalculator } from "./Accordion"
import Collapsible from "../../atoms/Collapsible"

const mockContent = [
  {
    collapsedContent: <h1>Mock Collapsed Content 1</h1>,
    openContent: <p>Mock open content 1</p>,
  },
  {
    collapsedContent: <h1>Mock Collapsed Content 2</h1>,
    openContent: <p>Mock open content 2</p>,
  },
  {
    collapsedContent: <h1>Mock Collapsed Content 3</h1>,
    openContent: <p>Mock open content 3</p>,
  },
]

const mockUpdateOpenPanels = jest.fn()

describe("Accordion", () => {
  it("should match last snaphot when default open & closed used", () => {
    const component = shallow(
      <Accordion content={mockContent} updateOpenPanels={mockUpdateOpenPanels} />,
    )
    expect(component).toMatchSnapshot()
  })

  it("test helper functions for style",()=>{
    expect(accordionWidthCalculator({ width: 10 })).toBe("10rem")
    expect(accordionWidthCalculator({ })).toBe("100%")
  })

  it("should return the correct open panel array when the handleOnClick is triggered", () => {
    const component = shallow(
      <Accordion
        open={[0]}
        locked={[2]}
        content={mockContent}
        updateOpenPanels={mockUpdateOpenPanels}
      />,
    )
    let result = component.instance().handleOnClick({ currentTarget: { dataset: { index: "0" } } })
    expect(result).toEqual([])

    result = component.instance().handleOnClick({ currentTarget: { dataset: { index: "1" } } })
    expect(result).toEqual([0, 1])

    result = component.instance().handleOnClick({ currentTarget: { dataset: { index: "2" } } })
    expect(result).toEqual([0])

    result = component.instance().handleOnClick({ currentTarget: { dataset: {  } } })
    expect(result).toEqual([0])
  })
  it("should render the the collapsibles correctly based on the content passed", () => {
    const component = shallow(
      <Accordion
        open={[0]}
        locked={[2]}
        content={mockContent}
        updateOpenPanels={mockUpdateOpenPanels}
      />,
    )
    const collapsibles = component.instance().renderPanels()
    expect(collapsibles).toHaveLength(3)

    expect(component.find(Collapsible).get(0).props.open).toBe(true)
    expect(component.find(Collapsible).get(0).props.locked).toBe(false)
    expect(component.find(Collapsible).get(0).props.index).toBe(0)
    expect(component.find(Collapsible).get(0).props.collapsedContent).toBe(
      mockContent[0].collapsedContent,
    )
    expect(component.find(Collapsible).get(0).props.children).toBe(mockContent[0].openContent)

    expect(component.find(Collapsible).get(1).props.open).toBe(false)
    expect(component.find(Collapsible).get(1).props.locked).toBe(false)
    expect(component.find(Collapsible).get(1).props.index).toBe(1)
    expect(component.find(Collapsible).get(1).props.collapsedContent).toBe(
      mockContent[1].collapsedContent,
    )
    expect(component.find(Collapsible).get(1).props.children).toBe(mockContent[1].openContent)

    expect(component.find(Collapsible).get(2).props.open).toBe(false)
    expect(component.find(Collapsible).get(2).props.locked).toBe(true)
    expect(component.find(Collapsible).get(2).props.index).toBe(2)
    expect(component.find(Collapsible).get(2).props.collapsedContent).toBe(
      mockContent[2].collapsedContent,
    )
    expect(component.find(Collapsible).get(2).props.children).toBe(mockContent[2].openContent)
  })
})
