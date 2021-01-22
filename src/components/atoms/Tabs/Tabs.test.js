import React from "react"
import { mount } from "enzyme"
import "jest-styled-components"
import Tabs from "./Tabs"

describe("Tabs", () => {
  const component = mount(
    <Tabs id="name" htmlFor="name">
      Name
    </Tabs>,
  )

  it("render tabs with bold text", () => {
    expect(component.text()).toEqual("Name")
    expect(component.prop("id")).toEqual("name")
    expect(component.prop("htmlFor")).toEqual("name")
  })

  it("render matches last snapshot", () => {
    expect(component).toMatchSnapshot()
  })
})
