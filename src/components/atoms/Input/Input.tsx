import React from "react";
import styled from "styled-components";

import { colourPalette } from "../../../brandColours";

const Container = styled.div``;

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
`;
StyledInput.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledInput.displayName = "StyledInput";

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

interface IInput extends React.HTMLProps<HTMLInputElement> {
  multiLine: boolean;
}
interface ITextArea extends React.HTMLProps<HTMLTextAreaElement> {
  multiLine: boolean;
}

const Input: React.FC<IInput> | React.FC<ITextArea> = (props: IInput) => {
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
  } = props;

  const InputType: React.ComponentType<
    React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement>
  > = multiLine ? StyledTextArea : StyledInput;
  const inputClassName = className ? `Input ${className}` : "Input";
  return (
    <Container>
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
    </Container>
  );
};

export default Input;
