import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import Label from "../../atoms/Label"
import Input from "../../atoms/Input"

// Declare CSS values for Container
const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
`
Container.displayName = "Container"

// Declare FormInput React Component
const FormInput = props => {
  // Refactor values from props (ES6)
  const {
    className,
    name,
    value,
    id,
    type,
    onChange,
    placeholder,
    label,
    disabled,
    bgColour,
    border,
    icon,
  } = props
  return (
    <Container className={className}>
      <Input
        name={name}
        value={value}
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        bgColor={bgColour}
        border={border}
        icons={icon}
      />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  )
}

// Declare the display name of component for static build
// Display name should match export name
FormInput.displayName = "FormInput"

// Declare propTypes values for FormInput
FormInput.propTypes = {
  /** Display Text */
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  /** Placeholder is not a replacement for label as it is not optimal for handicapped users */
  placeholder: PropTypes.string,
  /** Needed when making controlled inputs for React */
  onChange: PropTypes.func.isRequired,
  /** Needed when making controlled inputs for React */
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  bgColour: PropTypes.string,
  border: PropTypes.string,
  icon: PropTypes.string,
}

export default FormInput
