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


interface IProps extends React.HTMLProps<HTMLInputElement> {
  multiLine: boolean;
  icon: React.ReactNode;
}

const Input: React.FC<IProps> = (props: IProps ) => {
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
    icon,
  } = props;

  const inputClassName = className ? `Input ${className}` : "Input";
  return (
    <Container>
      {icon || null}
      <StyledInput
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
