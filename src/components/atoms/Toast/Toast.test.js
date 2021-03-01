import React from "react"
import { mount, shallow } from "enzyme"
import toJson from "enzyme-to-json"
import "jest-styled-components"
import Toast, { ToastContainer } from "./Toast"

describe("Tabs", () => {
  const propsDefault = {
    align: "middle",
  top: undefined,
  position: undefined,
  type: "error",
  visible: true,
  }
  const props = {
    align: "middle",
    top: "20px",
    position: "fixed",
    type: "error",
    visible: true,
  }
  const propsNotVisible = {
    align: "middle",
    top: "20px",
    position: "fixed",
    type: "error",
    visible: false,
  }
  const componentDefault = shallow(<Toast {...propsDefault} ><div>test</div></Toast>)
  const component = shallow(
    <Toast {...props}>
      <div>test</div>
    </Toast>,
  )
  const componentnotVisible = shallow(
    <Toast {...propsNotVisible}>
      <div>test</div>
    </Toast>,
  )

  it("should match the snapshot for default props", () => {
    const tree = toJson(componentDefault)
    expect(tree).toMatchSnapshot()
  })

  it("should match the snapshot", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("should match the snapshot not visible", () => {
    const tree = toJson(componentnotVisible)
    expect(tree).toMatchSnapshot()
  })

  it("ToastContainer should match the snapshot default props", () => {
    const ToastContainerShallow = mount(
      <ToastContainer {...propsDefault}>
        <button className="selected" type="button">
          tab
        </button>
      </ToastContainer>,
    )
    const tree = toJson(ToastContainerShallow)
    expect(tree).toMatchSnapshot()
  })

  it("ToastContainer should match the snapshot", () => {
    const ToastContainerShallow = mount(
      <ToastContainer {...props}>
        <button className="selected" type="button">
          tab
        </button>
      </ToastContainer>,
    )
    const tree = toJson(ToastContainerShallow)
    expect(tree).toMatchSnapshot()
  })

  it("ToastContainer should match the snapshot not visible", () => {
    const ToastContainerShallow = mount(
      <ToastContainer {...propsNotVisible}>
        <button className="selected" type="button">
          tab
        </button>
      </ToastContainer>,
    )
    const tree = toJson(ToastContainerShallow)
    expect(tree).toMatchSnapshot()
  })

})
