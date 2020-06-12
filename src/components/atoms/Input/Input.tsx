import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colourPalette } from "../../../brandColours"

// Decalre CSS for StyledInput with styled component
const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.black.tint40.hex};
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  transition: 0.3s ease all;
  color: ${props => props.theme.black.main.hex};
  :active,
  :focus {
    border-bottom: 2px solid ${props => props.theme.primary.main.hex};
    + label {
      color: ${props => props.theme.primary.main.hex};
    }
  }
`
StyledInput.defaultProps = {
  theme: colourPalette.examplePalette,
}
StyledInput.displayName = "StyledInput"

const StyledTextArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  outline: none;
  border: 1px solid ${props => props.theme.black.tint40.hex};
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  transition: 0.3s ease all;
  color: ${props => props.theme.black.main.hex};
  :active,
  :focus {
    border-bottom: 2px solid ${props => props.theme.primary.main.hex};
    + label {
      color: ${props => props.theme.primary.main.hex};
    }
  }
  border-radius: 5px;
  margin-top: 0.5rem;
  height: 10rem;
  border-bottom: 1px solid ${props => props.theme.black.tint40.hex};
`;
StyledTextArea.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledTextArea.displayName = "StyledInput";

// Declare React Component Input
const Input = (props: any) => {
  // Refactored values out of props
  const {
    className,
    type,
    onChange,
    placeholder,
    id,
    name,
    value,
    required,
    disabled,
    multiLine = false,
  } = props

  const InputType = multiLine ? StyledTextArea : StyledInput;
  const inputClassName = className ? `Input ${className}` : "Input";
  return (
      <InputType
        className={inputClassName}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
      />
  );
}

// // Declare the display name of component for static build
// // Display name should match export name
// Input.displayName = "Input"
// // Declare propTypes of Input
// Input.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   type: PropTypes.string,
//   disabled: PropTypes.bool,
//   /** Placeholder is not a replacement for label as it is not optimal for handicapped users */
//   placeholder: PropTypes.string,
//   /** Needed for controlled inputs */
//   onChange: PropTypes.func,
//   /** Needed for controlled inputs */
//   value: PropTypes.string,
//   required: PropTypes.bool,
//   className: PropTypes.string,
//   multiLine: PropTypes.bool,
// }

export default Input
