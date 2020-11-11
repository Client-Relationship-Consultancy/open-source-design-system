import React from "react";
import styled, { withTheme } from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { colourPalette, IColourPalette } from "../../../brandColours";
import Icon from "../Icon/Icon";
import { buttonStyles, ButtonStyle } from "./buttonStyles";

export type ButtonType = "primary" | "primaryOutline" | "secondaryOutline" | "danger" | "ghost";
export type IconType = IconProp | SVGElement | React.ReactElement;
export type IconPosition = "before" | "after";
export type IconSize = "medium" | "large";
export type ButtonSize = "small" | "medium" | "large";

const ButtonWrapper = styled.div`
  display: inline-flex;
  padding: 0.1rem;
`;

ButtonWrapper.displayName = "ButtonWrapper";

const InnerBorder = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.white.hex};
  border-radius: 5px;
  transition: opacity 0.15s;
`;

InnerBorder.defaultProps = {
  theme: colourPalette.examplePalette,
};

interface IStyledButton {
  fontSize: string;
  padding: string;
  buttonStyle: ButtonStyle;
  height: string;
  buttonSize: ButtonSize;
  iconSize: IconSize;
  iconPosition: IconPosition;
}

export const StyledButton = styled.button<IStyledButton>`
  display: flex;
  flex-direction: ${({ iconPosition }) => (iconPosition === "before" ? "row" : "row-reverse")};
  align-items: center;
  position: relative;
  white-space: nowrap;
  outline: none;
  height: ${({ height }) => height};
  width: auto;
  padding: ${({ padding }) => padding};
  background-color: ${({ buttonStyle }) => buttonStyle.background};
  color: ${({ buttonStyle }) => buttonStyle.color};
  border: 1px solid ${({ buttonStyle }) => buttonStyle.border};
  border-radius: 5px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
  line-height: ${({ fontSize }) => fontSize};
  transition-property: color, background-color, border;
  transition-duration: 0.15s;
  .dsButtonIcon {
    width: ${({ iconSize, buttonSize }) =>
      iconSize === "large" && buttonSize === "large" ? "1.5em" : "1em"};
    height: 1.5em;
    display: flex;
    align-items: center;
    margin: ${({ iconPosition }) => (iconPosition === "before" ? "0 0.25em 0 0" : "0 0 0 0.25em")};
    svg {
      font-size: ${({ fontSize }) => fontSize};
      height: ${({ iconSize, buttonSize }) =>
        iconSize === "large" && buttonSize === "large"
          ? "1.5em"
          : "1em"} !important; // stops fontawesome override
      width: ${({ iconSize, buttonSize }) =>
        iconSize === "large" && buttonSize === "large"
          ? "1.5em"
          : "1em"} !important; // stops fontawesome override
      color: ${({ buttonStyle }) => buttonStyle.color};
      fill: ${({ buttonStyle }) => buttonStyle.color};
      stroke: ${({ buttonStyle }) => buttonStyle.color};
    }
  }
  ${InnerBorder} {
    opacity: 0;
  }
  :enabled {
    &:hover {
      cursor: pointer;
      background-color: ${({ buttonStyle }) =>
        buttonStyle.hover?.background ?? buttonStyle.background};
      color: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
      border: 1px solid ${({ buttonStyle }) => buttonStyle.hover?.border ?? buttonStyle.border};
    }
    &:active,
    &:focus {
      background-color: ${({ buttonStyle }) =>
        buttonStyle.focus?.background ?? buttonStyle.background};
      color: ${({ buttonStyle }) => buttonStyle.focus?.color ?? buttonStyle.color};
      border: 1px solid ${({ buttonStyle }) => buttonStyle.focus?.border ?? buttonStyle.border};

      ${InnerBorder} {
        opacity: 1;
      }
    }
    &:hover,
    &:active,
    &:focus {
      svg {
        color: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        fill: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        stroke: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
      }
    }
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

StyledButton.displayName = "StyledButton";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  buttonType?: ButtonType;
  theme: IColourPalette;
  disabled?: boolean;
  icon?: IconType;
  iconSize?: IconSize;
  iconPosition?: IconPosition;
}

class BasicButton extends React.PureComponent<IProps> {
  static defaultProps = {
    theme: colourPalette.examplePalette,
    buttonType: "primary",
  };

  getFontSize = (): string => {
    if (this.props.buttonSize === "large") {
      return "1rem";
    }
    return "0.875rem";
  };

  getHeight = (): string => {
    switch (this.props.buttonSize) {
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
    switch (this.props.buttonSize) {
      case "large":
        if (this.props.icon && this.props.buttonSize === "large" && this.props.iconSize === "large")
          return "0.75rem 0.5rem";
        return "0.75rem 1rem";
      case "medium":
        return "0.5rem 1rem";
      case "small":
        return "0.25rem 0.5rem";
      default:
        return "0.5rem 1rem";
    }
  };

  getButtonStyle = (): ButtonStyle =>
    buttonStyles(this.props.theme)[this.props.buttonType ?? "primary"];

  render = () => {
    const {
      disabled = false,
      buttonSize = "medium",
      onClick,
      icon,
      iconPosition = "before",
      iconSize = "medium",
    } = this.props;

    return (
      <ButtonWrapper>
        <StyledButton
          buttonStyle={this.getButtonStyle()}
          fontSize={this.getFontSize()}
          padding={this.getPadding()}
          height={this.getHeight()}
          onClick={onClick}
          disabled={disabled}
          buttonSize={buttonSize}
          iconPosition={iconPosition}
          iconSize={iconSize}
        >
          <InnerBorder />
          {icon &&
            (typeof icon === "string" ? (
              <Icon name={icon} className="dsButtonIcon" />
            ) : (
              <div className="dsButtonIcon">{icon}</div> // wrapper for SVG or react element
            ))}
          {this.props.children}
        </StyledButton>
      </ButtonWrapper>
    );
  };
}

const Button = withTheme(BasicButton);
Button.displayName = "Button";

export default Button;
