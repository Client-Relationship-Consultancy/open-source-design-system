import React from "react";
import styled, { withTheme } from "styled-components";

interface IStyledButton {
  fontSize: string;
  padding: string;
}

const StyledButton = styled.button<IStyledButton>`
  outline: none;
  border: 1px solid ${props => props.theme.action.main.hex};
  padding: ${props => props.padding};
  background-color: ${props => props.theme.action.main.hex};
  color: ${props => props.theme.white.hex};
  border-radius: 0.25rem;
  font-size: ${props => props.fontSize};
  line-height: ${props => props.fontSize};
  transition: all 0.3s ease;
  :hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.action.dark.hex};
    border: 1px solid ${props => props.theme.action.dark.hex};
    :focus {
      background-color: ${props => props.theme.action.dark.hex};
      border: 1px solid ${props => props.theme.white.hex};
      box-shadow: 0 0 0 1px ${props => props.theme.action.dark.hex};
    }
  }
  :active,
  :focus {
    background-color: ${props => props.theme.action.main.hex};
    border: 1px solid ${props => props.theme.white.hex};
    box-shadow: 0 0 0 1px ${props => props.theme.action.main.hex};
  }
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

interface IProps {
  size?: "small" | "medium" | "large";
}

class PureButton extends React.PureComponent<IProps> {
  getFontSize = (): string => {
    if (this.props.size === "large") {
      return "1rem";
    }
    return "0.875rem";
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

  render = () => {
    return (
      <StyledButton fontSize={this.getFontSize()} padding={this.getPadding()} type="button">
        {this.props.children}
      </StyledButton>
    );
  };
}

const Button = PureButton;

export default Button;
