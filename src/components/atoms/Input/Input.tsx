import React from "react";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Icon from "../Icon";
import { colourPalette } from "../../../brandColours";

interface IContainer {
  bgColor?: string;
  border?: "bottom" | "all";
}

export const Container = styled.div<IContainer>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  ${props => (props.border === "bottom" ? "padding-left: 0;" : "")}
  background-color: ${props => props.bgColor || "transparent"};
  width: 100%;
  ${props => {
    switch (props.border) {
      case "all":
        return `border: 1px solid ${props.theme.black.tint60.hex};`;
      case "bottom":
        return `border-bottom: 1px solid ${props.theme.black.tint60.hex};`;
      default:
        return "border: none;";
    }
  }}
  svg {
    color: ${props => props.theme.black.tint80.hex};
  }
  > * + * {
    margin-left: 0.25rem;
  }
  :focus-within {
    svg {
      color: ${props => props.theme.secondary.main.hex};
    }
    ${props => {
      switch (props.border) {
        case "all":
          return `border: 1px solid ${props.theme.secondary.main.hex};`;
        case "bottom":
          return `border-bottom: 1px solid ${props.theme.secondary.main.hex};`;
        default:
          return "border: none;";
      }
    }}
  }
`;

Container.defaultProps = {
  theme: colourPalette.examplePalette,
};

Container.displayName = "Container";

interface IStyledInput {
  color?: string;
}

export const StyledInput = styled.input<IStyledInput>`
  width: 100%;
  background-color: transparent;
  display: block;
  box-sizing: border-box;
  outline: none;
  border: none;
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  transition: 0.3s ease all;
  color: ${props => props.color || props.theme.black.main.hex};
  ::placeholder {
    color: ${props => props.theme.black.tint80.hex};
  }
`;

StyledInput.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledInput.displayName = "StyledInput";

type InputType = React.HTMLProps<HTMLInputElement> & IContainer & IStyledInput;

interface IProps extends InputType {
  icon?: IconProp;
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
    border,
    color
  } = props;

  const handleFocus =
    onFocus || ((event: React.FocusEvent<HTMLInputElement>) => event.target.select());

  const inputClassName = className ? `Input ${className}` : "Input";

  return (
    <Container bgColor={bgColor} border={border}>
      {icon && <Icon name={icon} />}
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
        color={color}
      />
    </Container>
  );
};

export default Input;
