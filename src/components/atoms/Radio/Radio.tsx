import React from "react";
import styled from "styled-components";

import { colourPalette } from "../../../brandColours";

type InputPropsType = React.HTMLProps<HTMLInputElement>;

const StyledRadio = styled.input.attrs({
  type: "radio",
})`
  appearance: none;
  box-shadow: none;
  border: 2px solid ${props => props.theme.secondary.main.hex};
  outline: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  transition: 0.3s ease all;
  :hover {
    border-color: ${props => props.theme.secondary.dark.hex};
    cursor: pointer;
  }
  :focus,
  :checked,
  :active {
    border-color: ${props => props.theme.secondary.dark.hex};
    background-color: ${props => props.theme.secondary.dark.hex};
    + label {
      font-weight: bold;
      color: ${props => props.theme.secondary.dark.hex};
    }
  }
`;
StyledRadio.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledRadio.displayName = "StyledRadio";

const Radio: React.FunctionComponent<InputPropsType> = props => {
  const { className, id, name, onChange, checked, required } = props;
  return (
    <StyledRadio
      className={className}
      id={id}
      name={name}
      onChange={onChange}
      checked={checked}
      required={required}
    />
  );
};

Radio.displayName = "Radio";

export default Radio;
