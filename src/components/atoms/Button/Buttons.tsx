import React from "react";
import styled, { withTheme } from "styled-components";
import { colourPalette, IColourPalette } from "../../../brandColours";
import { buttonStyles, IButtonStyle } from "./buttonStyles";

interface IStyledButton {
  fontSize: string;
  padding: string;
  buttonStyle: IButtonStyle;
  height: string;
}

const StyledButton = styled.button<IStyledButton>`
  position: relative;
  outline: none;
  height: ${(props) => props.height};
  width: auto;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.buttonStyle.background};
  color: ${(props) => props.buttonStyle.color};
  border: 1px solid ${(props) => props.buttonStyle.border};
  border-radius: 0.25rem;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.fontSize};
  transition: all 0.3s ease;
  :hover:enabled {
    cursor: pointer;
    background-color: ${({ buttonStyle }) =>
      buttonStyle.hover.background && buttonStyle.hover.background};
    color: ${({ buttonStyle }) => buttonStyle.hover.color && buttonStyle.hover.color};
    border: 1px solid ${({ buttonStyle }) => buttonStyle.hover.border && buttonStyle.hover.border};
  }
  :active,
  :focus {
    background-color: ${({ buttonStyle }) =>
      buttonStyle.focus.background && buttonStyle.focus.background};
    color: ${({ buttonStyle }) => buttonStyle.focus.color && buttonStyle.focus.color};
    border: 1px solid ${({ buttonStyle }) => buttonStyle.focus.border && buttonStyle.focus.border};
  }
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const InnerBorder = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  box-shadow: inset 0px 0px 0 1px white;
  border-radius: 0.25rem;
`;

type ButtonType = "primary" | "primaryOutline" | "secondaryOutline" | "danger" | "ghost";

interface IProps {
  size?: "small" | "medium" | "large";
  buttonType: ButtonType;
  theme: IColourPalette;
}

class BasicButton extends React.PureComponent<IProps> {
  static defaultProps = {
    theme: colourPalette.examplePalette,
    buttonType: "primary",
    size: "medium",
  };

  getFontSize = (): string => {
    if (this.props.size === "large") {
      return "1rem";
    }
    return "0.875rem";
  };

  getHeight = (): string => {
    switch (this.props.size) {
      case "large":
        return "2.5rem";
      case "medium":
        return "2rem";
      case "small":
        return "1.5rem";
      default:
        return "2rem";
    }
  };

  getPadding = (): string => {
    switch (this.props.size) {
      case "large":
        return "0.75rem 1rem";
      case "medium":
        return "0.5rem 1rem";
      case "small":
        return "0.25rem 0.5rem";
      default:
        return "0.5rem 1rem";
    }
  };

  getButtonStyle = (): IButtonStyle => {
    return buttonStyles(this.props.theme)[this.props.buttonType];
  };

  render = () => {
    return (
      <StyledButton
        buttonStyle={this.getButtonStyle()}
        fontSize={this.getFontSize()}
        padding={this.getPadding()}
        height={this.getHeight()}
      >
        <InnerBorder />
        {this.props.children}
      </StyledButton>
    );
  };
}

const Button = withTheme(BasicButton);

export default Button;
