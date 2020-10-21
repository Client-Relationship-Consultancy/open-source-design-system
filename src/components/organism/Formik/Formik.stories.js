import React from "react"

import { storiesOf } from "@storybook/react"
import {
  Field,
  Form,
  Submit,
  FormikSelect,
  FormikCheckbox,
  FormikTextToggle,
  TimezoneSelect,
} from "../../../index"

const stories = storiesOf("Forms", module)

const titleOptions = { mr: "Mr", ms: "Ms", miss: "Miss" }

const petOptions = {
  dog: "Dog",
  cat: "Cat",
  bird: "Bird",
  rabbit: "Rabbit",
}

stories.add(
  "Example Form",
  () => (
    // Customised Formik Wrapper - requires initialValues, onSubmit, validate
    <Form
      // Base values for form - should match [name] of inputs/Field
      initialValues={{
        title: "",
        name: "",
        email: "",
        pet: { value: "dog", label: "Dog" },
        subscribe: "",
        "opt-out": false,
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(values)
          actions.setSubmitting(false)
        }, 3000)
      }}
      // Validation rules - places error into errors object of Field[name]
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = "Name is required"
        }
        if (!values.email) {
          errors.email = "Please enter your email"
        }
        if (values.pet.length < 3) {
          errors.pet = "Must choose at least 3 pets"
        }
        return errors
      }}
    >
      <FormikSelect
        title="Title"
        options={titleOptions}
        name="title"
        placeholder="Please choose a title"
        onChange={() => {}}
        isClearable
      />
      <Field type="text" id="name" name="name" title="Name" isValid />
      <Field type="textarea" id="productConfig" config="productConfig" title="Config" isValid />
      <Field type="email" name="email" id="email" title="Email" isValid />
      <FormikSelect
        title="Pets"
        options={petOptions}
        name="pet"
        placeholder="What pets do you like to have?"
        isValid
      />
      <TimezoneSelect id="timezone" title="Timezone" name="timezone" />
      <p>Teabag in or out?</p>
      <Field type="radio" row name="teabag" id="in" title="In:" />
      <Field type="radio" row name="teabag" id="out" title="Out:" />
      <FormikCheckbox name="account" label="Account" id="account" disabled />
      <FormikCheckbox name="market" label="Market" id="market" />
      <FormikTextToggle name="opt-out" label="Opt Out:" id="opt-out" />
      <Submit>Submit</Submit>
    </Form>
  ),
  {
    info: {
      propTablesExclude: [Submit],
    },
  },
)
