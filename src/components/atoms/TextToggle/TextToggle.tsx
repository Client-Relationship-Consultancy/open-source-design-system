import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

interface ILabel {
  isDisabled?: boolean;
}

const Label = styled.label<ILabel>`
  position: relative;
  display: inline-block;
  height: 1.75rem;
  overflow: hidden;
  border-radius: 5px;
  opacity: ${({isDisabled}) => (isDisabled ? "0.4" : "1")};
  cursor: ${({isDisabled}) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 1.5rem/1.5rem;
`;

Label.displayName = "Label";

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({theme}) => theme.black.tint60.hex};
  transition: 0.2s ease-out;
  justify-content: center;
  align-items: center;
`;

SliderContainer.defaultProps = {
  theme: colourPalette.examplePalette,
};

SliderContainer.displayName = "SliderContainer";

const Toggle = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  :checked + div {
    background-color: ${({theme}) => theme.primary.main.hex};
    > div {
      left: calc(100% - 1.75rem);
    }
    .optionText.trueOption {
      opacity: 1;
    }
    .optionText.falseOption {
      opacity: 0;
    }
  }
`;

Toggle.defaultProps = {
  theme: colourPalette.examplePalette,
};

Toggle.displayName = "Toggle";

const BallContainer = styled.div`
  padding: 3px;
  height: 1.75rem;
  width: 1.75rem;
  position: absolute;
  transition: 0.4s ease;
  left: 0;
`;

const Ball = styled.div`
  background-color: ${({theme}) => theme.white.hex};
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: 1px 1px 5px ${({theme}) => theme.black.tint80.hex};
`;

Ball.defaultProps = {
  theme: colourPalette.examplePalette,
};

Ball.displayName = "Ball";

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.white.hex};
  > div {
    transition: 0.3s;
    width: 100%;
  }
  > div.trueOption {
    opacity: 0;
    transform: translateY(50%);
    text-align: right;
    padding-right: 2rem;
    padding-left: 1rem;
  }
  > div.falseOption {
    opacity: 1;
    transform: translateY(-50%);
    padding-right: 1rem;
    padding-left: 2rem;
  }
`;

OptionText.defaultProps = {
  theme: colourPalette.examplePalette,
};

OptionText.displayName = "OptionText";

interface ITextToggle extends React.HTMLProps<HTMLInputElement> {
  isDisabled?: boolean;
  falseOption: React.ReactNode;
  trueOption: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const TextToggle: React.FC<ITextToggle> = (props: ITextToggle) => {
  const {
    id,
    name,
    onChange,
    onBlur,
    trueOption,
    falseOption,
    isDisabled,
    checked,
  } = props;
  return (
    <Label isDisabled={isDisabled} className="TextToggle__Label">
      <Toggle
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        checked={checked}
        id={id}
        disabled={isDisabled}

      />
      <SliderContainer>
        <BallContainer>
          <Ball />
        </BallContainer>
        <OptionText>
          <div className="optionText trueOption">{trueOption}</div>
          <div className="optionText falseOption">{falseOption}</div>
        </OptionText>
      </SliderContainer>
    </Label>
  );
};
TextToggle.displayName = "TextToggle";

TextToggle.defaultProps = {
  trueOption: "True",
  falseOption: "False",
  isDisabled: false,
};

export default TextToggle;
