import React from "react";
import styled, { withTheme } from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { colourPalette, IColourPalette } from "../../../../brandColours";
import Icon from "../../Icon/Icon";
import { iconButtonStyles, IconButtonStyle } from "./iconButtonStyles";

export type ButtonType = "primary" | "primaryOutline" | "secondaryOutline" | "danger" | "ghost";
export type IconType = IconProp | SVGElement | React.ReactElement;
export type IconPosition = "before" | "after";
export type ButtonSize = "small" | "medium" | "large";

interface IStyledIconButton {
  buttonStyle: IconButtonStyle;
  buttonDimensions: string;
  iconDimensions: string;
  buttonSize: ButtonSize;
}

export const StyledIconButton = styled.button<IStyledIconButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  height: ${({ buttonDimensions }) => buttonDimensions};
  width: ${({ buttonDimensions }) => buttonDimensions};
  background-color: ${({ buttonStyle }) => buttonStyle.background};
  color: ${({ buttonStyle }) => buttonStyle.color};
  border: 1px solid ${({ buttonStyle }) => buttonStyle.border};
  border-radius: 50%;
  transition-property: color, background-color, border;
  transition-duration: 0.15s;
  .dsButtonIcon {
    width: ${({ iconDimensions }) => iconDimensions};
    height: ${({ iconDimensions }) => iconDimensions};
    display: flex;
    align-items: center;
    svg {
      height: ${({ iconDimensions }) => iconDimensions};
      width: ${({ iconDimensions }) => iconDimensions};
      color: ${({ buttonStyle }) => buttonStyle.color};
      fill: ${({ buttonStyle }) => buttonStyle.color};
      stroke: ${({ buttonStyle }) => buttonStyle.color};
    }
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
    }
    &:hover,
    &:active {
      svg {
        color: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        fill: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        stroke: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
      }
    }
    &:focus {
      svg {
        color: ${({ buttonStyle }) => buttonStyle.focus?.color ?? buttonStyle.color};
        fill: ${({ buttonStyle }) => buttonStyle.focus?.color ?? buttonStyle.color};
        stroke: ${({ buttonStyle }) => buttonStyle.focus?.color ?? buttonStyle.color};
      }
    }
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

StyledIconButton.displayName = "StyledIconButton";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  buttonType?: ButtonType;
  theme: IColourPalette;
  disabled?: boolean;
  icon?: IconType;
}

class BasicIconButton extends React.PureComponent<IProps> {
  static defaultProps = {
    theme: colourPalette.examplePalette,
    buttonType: "primary",
  };

  getButtonDimensions = (): string => {
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

  getIconDimensions = (): string => {
    switch (this.props.buttonSize) {
      case "large":
        return "1.25rem";
      case "medium":
        return "1.125rem";
      case "small":
        return "1rem";
      default:
        return "1.125rem";
    }
  };

  getButtonStyle = (): IconButtonStyle =>
    iconButtonStyles(this.props.theme)[this.props.buttonType ?? "primary"];

  render = () => {
    const { disabled = false, buttonSize = "medium", onClick, icon } = this.props;

    return (
      <StyledIconButton
        {...this.props}
        buttonStyle={this.getButtonStyle()}
        buttonDimensions={this.getButtonDimensions()}
        iconDimensions={this.getIconDimensions()}
        onClick={onClick}
        disabled={disabled}
        buttonSize={buttonSize}
      >
        {icon &&
          (typeof icon === "string" ? (
            <Icon name={icon} className="dsButtonIcon" />
          ) : (
            <div className="dsButtonIcon">{icon}</div> // wrapper for SVG or react element
          ))}
      </StyledIconButton>
    );
  };
}

const IconButton = withTheme(BasicIconButton);
IconButton.displayName = "IconButton";

export default IconButton;
