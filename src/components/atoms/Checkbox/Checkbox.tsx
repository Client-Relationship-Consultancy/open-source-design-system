import React from "react";
import styled from "styled-components";
import { colourPalette, IColourPalette } from "../../../brandColours";

const StyledCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 20%;
  border: 2px solid ${props => props.theme.secondary.main.hex};
  outline: none;
  text-align: center;
  transition: 0.2s ease all;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  + label {
    color: ${props => props.theme.black.main.hex};
  }
  :checked {
    border: 2px solid ${props => props.theme.secondary.dark.hex};
    background-color: ${props => props.theme.white.main};
    + label {
      font-weight: bold;
      color: ${props => props.theme.secondary.dark.hex};
    }
    ::after {
      content: "\\2713";
      font-size: 0.8rem;
      line-height: 1rem;
      color: ${props => props.theme.secondary.dark.hex};
    }
  }
  :hover {
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    + label {
      color: ${props => props.theme.secondary.dark.hex};
    }
  }
`;

StyledCheckbox.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledCheckbox.displayName = "StyledCheckbox";

interface ICheckBoxProps {
  theme?: IColourPalette;
}

type Props = ICheckBoxProps & React.HTMLProps<HTMLInputElement>;

const Checkbox: React.FC<Props> = props => {
  const { id, className, name, checked, disabled, onChange, theme } = props;
  
  const styledCheckboxClassName: string = className
  ? `Checkbox__StyledCheckbox ${className}`
  : "Checkbox__StyledCheckbox";

  return (
    <StyledCheckbox
      id={id}
      className={styledCheckboxClassName}
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      theme={theme}
    />
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
