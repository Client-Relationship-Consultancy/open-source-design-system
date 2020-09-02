import React from "react"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import FileInput, { Container } from "./FileInput"

describe("FileInput test", () => {
  const handleUpload = jest.fn()
  const component = shallow(<FileInput handleUpload={handleUpload} />)
  it("match last snapshot", () => {
    expect(component).toMatchSnapshot()
  })

  it("change the selectedFile in the state", () => {
    expect(component.instance().state).toEqual({ selectedFile: null })
    component.instance().fileChangedHandler({ target: { files: ["hello"] } })
    expect(component.instance().state).toEqual({ selectedFile: "hello" })
  })

  it("match last snapshot with a file selected", () => {
    expect(component).toMatchSnapshot()
  })

  it("calls handleUpload when we click on upload", () => {
    component.instance().fileChangedHandler({ target: { files: ["hello"] } })
    component.find("#uploadButton").simulate("click")
    expect(handleUpload).toHaveBeenCalledWith("hello")
  })

  it("calls resetFile when we click on the cross Icon", () => {
    component.instance().fileChangedHandler({ target: { files: ["hello"] } })
    component.instance().resetFile()
    expect(component.instance().state).toEqual({ selectedFile: null })
  })

  it("doesn't change the selectedFile in the state if event contains no files", () => {
    expect(component.instance().state).toEqual({ selectedFile: null })
    component.instance().fileChangedHandler({ target: {} })
    expect(component.instance().state).toEqual({ selectedFile: null })
  })

  it("uses empty handleUpload function when not given one as a prop", () => {
    const componentWithoutHandleUpload = shallow(<FileInput />)
    const emptyReturn = componentWithoutHandleUpload.instance().handleUpload()
    expect(emptyReturn).toEqual(undefined)
  })
})

describe("Container", () => {
  it("has pointer events auto", () => {
    const container = mount(<Container selectedFile />)
    expect(container).toHaveStyleRule("pointer-events", "auto", {
      modifier: "button",
    })
  })

  it("has pointer events set to none", () => {
    const container = mount(<Container selectedFile={null} />)
    expect(container).toHaveStyleRule("pointer-events", "none", {
      modifier: "button",
    })
  })
})
