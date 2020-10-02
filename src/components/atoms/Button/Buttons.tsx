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
  border: 1px solid ${(props) => props.buttonStyle.border};
  padding: ${(props) => props.padding};
  color: ${(props) => props.buttonStyle.color};
  background-color: ${(props) => props.buttonStyle.background};
  border-radius: 0.25rem;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.fontSize};
  font-weight: ${(props) => props.buttonStyle.fontWeight};
  transition: all 0.3s ease;
  :hover:enabled {
    cursor: pointer;
    color: ${(props) => props.buttonStyle.hover.color};
    background-color: ${(props) => props.buttonStyle.hover.background};
    border: 1px solid ${(props) => props.buttonStyle.hover.border};
  }
  :active,
  :focus {
    color: ${(props) => props.buttonStyle.focus.color};
    background-color: ${(props) => props.buttonStyle.focus.background};
    border: 1px solid ${(props) => props.buttonStyle.focus.border};
    box-shadow: 0 0 0 1px ${(props) => props.buttonStyle.focus.boxShadow};
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

type ButtonType = "default" | "outline" | "complimentary" | "ghost" | "error";

interface IProps {
  size?: "small" | "medium" | "large";
  buttonType: ButtonType;
  theme: IColourPalette;
}

class BasicButton extends React.PureComponent<IProps> {
  static defaultProps = {
    theme: colourPalette.examplePalette,
    buttonType: "default",
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
