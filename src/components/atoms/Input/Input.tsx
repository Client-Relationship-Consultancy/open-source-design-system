import React from "react";
import styled from "styled-components";

import { colourPalette } from "../../../brandColours";

interface IContainer {
  bgColor: string;
}

export const Container = styled.div<IContainer>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.bgColor || "transparent"};
  > * + * {
    margin-left: 0.25rem;
  }
`;

Container.displayName = "Container";

export const StyledInput = styled.input`
  background-color: transparent;
  display: block;
  box-sizing: border-box;
  outline: none;
  border: none;
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  transition: 0.3s ease all;
  color: ${props => props.theme.black.main.hex};
  ::placeholder {
    color: ${props => props.theme.black.tint80.hex};
  }
`;

StyledInput.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledInput.displayName = "StyledInput";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  icon: React.ReactNode;
  bgColor: string;
}

const Input: React.FC<IProps> = (props: IProps) => {
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
    onFocus,
    bgColor,
  } = props;

  const handleFocus =
    onFocus || ((event: React.FocusEvent<HTMLInputElement>) => event.target.select());

  const inputClassName = className ? `Input ${className}` : "Input";

  return (
    <Container bgColor={bgColor}>
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
        onFocus={handleFocus}
      />
    </Container>
  );
};

export default Input;
