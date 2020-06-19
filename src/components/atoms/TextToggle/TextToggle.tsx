import React from "react";
import styled from "styled-components";

import { colourPalette } from "../../../brandColours";

interface ILabel {
  width: string;
  isDisabled: boolean;
}

const Label = styled.label<ILabel>`
  position: relative;
  display: inline-block;
  width: ${props => props.width};
  height: 1.75rem;
  overflow: hidden;
  border-radius: 5px;
  opacity: ${props => (props.isDisabled ? "0.4" : "1")};
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  border-radius: 1.5rem/1.5rem;
`;

Label.displayName = "Label";

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${props => props.theme.black.tint40.hex};
  transition: 0.2s ease-out;
`;
SliderContainer.displayName = "SliderContainer";

const Toggle = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  :checked + div {
    background-color: ${props => props.theme.primary.main.hex};
    > div {
      left: calc(100% - 1.75rem);
    }
  }
`;
Toggle.displayName = "Toggle";

const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 1.75rem);
  height: 100%;

  color: ${props => props.theme.black.main.hex};
  font-size: 0.9rem;
`;
Slider.defaultProps = {
  theme: colourPalette.examplePalette,
};
Slider.displayName = "Slider";

const CheckedSlider = styled(Slider)`
  color: ${props => props.theme.secondary.main.on};
`;
CheckedSlider.defaultProps = {
  theme: colourPalette.examplePalette,
};
CheckedSlider.displayName = "CheckedSlider";

const BallContainer = styled.div`
  padding: 5px;
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 50%;
  position: absolute;
  transition: 0.4s ease;
  left: 0;
`;

const Ball = styled.div`
  background-color: ${props => props.theme.white.hex};
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

interface ITextToggle extends React.HTMLProps<HTMLInputElement> {
  isDisabled: boolean;
  width: string;
  falseOption: React.ReactNode;
  trueOption: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const TextToggle: React.FC<ITextToggle> = (props: ITextToggle) => {
  const {
    id,
    name,
    value,
    onChange,
    onBlur,
    trueOption,
    falseOption,
    width,
    isDisabled,
    checked,
    ...other
  } = props
  return (
    <Label width={width} isDisabled={isDisabled} className="TextToggle__Label">
      <Toggle
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        checked={checked}
        id={id}
        disabled={isDisabled}
        // {...other}
      />
      <SliderContainer>
        <BallContainer>
          <Ball />
        </BallContainer>
      </SliderContainer>
    </Label>
  );
};
TextToggle.displayName = "TextToggle";

TextToggle.defaultProps = {
  trueOption: "True",
  falseOption: "False",
  width: "4.5rem",
  isDisabled: false,
};

export default TextToggle;
