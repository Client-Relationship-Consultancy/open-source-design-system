import React from "react"
import { shallow } from "enzyme"
import "jest-styled-components"

import FormInput from "./FormInput"

describe("FormInput test", () => {
  it("single line input matches the last snapshot", () => {
    const component = shallow(
      <FormInput label="Label" name="firstName" type="text" value="Bob" onChange={() => {}} />,
    )
    expect(component).toMatchSnapshot()
  })
})
