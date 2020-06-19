import React from "react";
import styled from "styled-components";

interface ILabel {
  width: string;
  isDisabled: boolean;
}

const Label = styled.label<ILabel>`
  position: relative;
  display: inline-block;
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
  background-color: ${props => props.theme.black.tint60.hex};
  transition: 0.2s ease-out;
  justify-content: center;
  align-items: center;
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
    .optionText.trueOption {
      opacity: 1;
    }
    .optionText.falseOption {
      opacity: 0;
    }
  }
`;
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
  background-color: ${props => props.theme.white.hex};
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: 1px 1px 5px ${props => props.theme.black.tint80.hex};
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.white.hex};
  > div {
    transition: 0.3s;
    width: 100%;
  }
  > div.trueOption {
    opacity: 0;
    transform: translateY(50%);
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
  } = props;
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
        {...other}
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
  width: "4.5rem",
  isDisabled: false,
};

export default TextToggle;
