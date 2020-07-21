import React from "react"
import styled from "styled-components"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text, boolean, object } from "@storybook/addon-knobs"

import { FormInput, FormRadio, FormCheckbox, Select, FormikDateTimePicker } from "../index"

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  > * + * {
    margin-left: 4rem;
  }
  &.column {
    flex-direction: column;
    > * + * {
      margin-left: 0;
      padding-top: 0.5rem;
    }
  }
`
Flex.displayName = "Flex"

const DivInline = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > * + * {
    margin-left: 0.5rem;
  }
`
DivInline.displayName = "DivInline"

class ExampleFormikDateTimePicker extends React.PureComponent {
  state = {
    selectedDate: new Date(),
  }

  onChangeDate = newDate => {
    this.setState({ selectedDate: newDate })
  }

  render() {
    return (
      <FormikDateTimePicker
        errorMessage=""
        touched={false}
        id="date"
        labelMessage={<div>Formik Date Time Picker</div>}
        value={this.state.selectedDate}
        onChange={this.onChangeDate}
      />
    )
  }
}

storiesOf("Forms", module)
  .add("Form Input", () => (
    <FormInput
      name="example"
      label={text("Display Text", "Name")}
      disabled={boolean("Disabled", false)}
      onChange={action("Value Change")}
      id="example"
      type="text"
      icon="search"
      border="all"
    />
  ))
  .add("Form Radio", () => (
    <Flex>
      <FormRadio
        row={boolean("Row Layout", false)}
        label={text("Radio 1", "Opt In")}
        name="eg1"
        id="opt-in1"
      />
      <FormRadio
        row={boolean("Row Layout", false)}
        label={text("Radio 2", "Opt Out")}
        name="eg1"
        id="opt-out1"
      />
    </Flex>
  ))
  .add("Form Checkbox", () => (
    <Flex className="column">
      <FormCheckbox
        label={text("Checkbox 1", "Dog")}
        className="normal"
        id="dog"
        name="dog"
        onChange={action("Dog")}
      />
      <FormCheckbox
        label={text("Checkbox 2", "Cat")}
        className="normal"
        id="cat"
        name="cat"
        onChange={action("Cat")}
      />
      <FormCheckbox
        label={text("Checkbox 3", "Bird")}
        className="normal"
        id="bird"
        name="bird"
        onChange={action("Bird")}
        checked
        disabled
      />
    </Flex>
  ))
  .add("Select options", () => {
    const options = {
      fma: "Fullmetal Alchemist",
      op: "One Piece",
      naruto: "Naruto",
      deathNote: "Death Note",
    }
    return (
      <Select
        options={object("Options", options)}
        isClearable={boolean("Clearable", true)}
        isDisabled={boolean("Disabled", false)}
        isMulti={boolean("Multiple Select", false)}
      />
    )
  })
  .add("Select options custom reverse sort", () => {
    const options = {
      fma: "Fullmetal Alchemist",
      op: "One Piece",
      naruto: "Naruto",
      deathNote: "Death Note",
    }
    const customSort = (a, b) => b.label.localeCompare(a.label)
    return (
      <Select
        customSort={customSort}
        options={object("Options", options)}
        isClearable={boolean("Clearable", true)}
        isDisabled={boolean("Disabled", false)}
        isMulti={boolean("Multiple Select", false)}
      />
    )
  })
  .add("Select options autosize based on placeholder", () => {
    const options = {
      fma: "Fullmetal Alchemist",
      op: "One Piece",
      naruto: "Naruto",
      deathNote: "Death Note",
    }
    return (
      <DivInline id="test">
        <Select
          hide={boolean("Hide", true)}
          options={object("Options", options)}
          isClearable={boolean("Clearable", true)}
          isDisabled={boolean("Disabled", false)}
          isMulti={boolean("Multiple Select", false)}
          placeholder={text("placeholder 1", "Heroes")}
          autosizeBasedOnPlaceholder={boolean("autosizeBasedOnPlaceholder", true)}
        />
        <Select
          hide={boolean("Hide", true)}
          options={object("Options", options)}
          isClearable={boolean("Clearable", true)}
          isDisabled={boolean("Disabled", false)}
          isMulti={boolean("Multiple Select", false)}
          placeholder={text("placeholder 2", "Heroes superpowers")}
          autosizeBasedOnPlaceholder={boolean("autosizeBasedOnPlaceholder", true)}
        />
        <Select
          hide={boolean("Hide", true)}
          options={object("Options", options)}
          isClearable={boolean("Clearable", true)}
          isDisabled={boolean("Disabled", false)}
          isMulti={boolean("Multiple Select", false)}
          placeholder={text("placeholder 3", "wooow")}
          autosizeBasedOnPlaceholder={boolean("autosizeBasedOnPlaceholder", true)}
        />
      </DivInline>
    )
  })
  .add("Formik Date Time Picker", () => <ExampleFormikDateTimePicker />)
