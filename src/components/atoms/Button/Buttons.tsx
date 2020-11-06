import React from "react";
import styled, { withTheme } from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { colourPalette, IColourPalette } from "../../../brandColours";
import Icon from "../Icon/Icon";
import { buttonStyles, ButtonStyle } from "./buttonStyles";

const InnerBorder = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  border: 1px white solid;
  border-radius: 5px;
  transition: opacity 0.15s;
`;

interface IStyledButton {
  fontSize: string;
  padding: string;
  buttonStyle: ButtonStyle;
  height: string;
  size: "small" | "medium" | "large";
  iconSize: "medium" | "large";
  iconPosition: "before" | "after";
}

export const StyledButton = styled.button<IStyledButton>`
  display: flex;
  flex-direction: ${({ iconPosition }) => (iconPosition === "before" ? "row" : "row-reverse")};
  align-items: center;
  position: relative;
  outline: none;
  height: ${(props) => props.height};
  width: auto;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.buttonStyle.background};
  color: ${(props) => props.buttonStyle.color};
  border: 1px solid ${(props) => props.buttonStyle.border};
  border-radius: 5px;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.fontSize};
  transition-property: color, background-color, border;
  transition-duration: 0.15s;
  .dsButtonIcon {
    width:  ${(props) => (props.iconSize === "large" && props.size === "large" ? "1.5em" : "1em")};
    height: 1.5em;
    display: flex;
    align-items: center;
    margin: ${({ iconPosition }) => (iconPosition === "before" ? "0 0.25em 0 0" : "0 0 0 0.25em")};
    }
    svg {
      font-size: ${(props) => props.fontSize};
      height: ${(props) =>
        props.iconSize === "large" && props.size === "large" ? "1.5em" : "1em"} !important;
      width: ${(props) =>
        props.iconSize === "large" && props.size === "large" ? "1.5em" : "1em"} !important;
      color: ${(props) => props.buttonStyle.color};
      fill: ${(props) => props.buttonStyle.color};
      stroke: ${(props) => props.buttonStyle.color};
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

      svg {
        color: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        fill: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
        stroke: ${({ buttonStyle }) => buttonStyle.hover?.color ?? buttonStyle.color};
      }
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
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type ButtonType = "primary" | "primaryOutline" | "secondaryOutline" | "danger" | "ghost";

interface IProps {
  size?: "small" | "medium" | "large";
  buttonType: ButtonType;
  theme: IColourPalette;
  disabled?: boolean;
  icon?: IconProp | SVGElement;
  iconSize?: "medium" | "large";
  iconPosition?: "before" | "after";
}

class BasicButton extends React.PureComponent<IProps> {
  static defaultProps = {
    theme: colourPalette.examplePalette,
    buttonType: "primary",
    size: "medium",
    disabled: false,
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
        if (this.props.icon && this.props.size === "large" && this.props.iconSize === "large")
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

  getButtonStyle = (): ButtonStyle => {
    return buttonStyles(this.props.theme)[this.props.buttonType];
  };

  render = () => {
    const {
      disabled,
      size = "medium",
      icon,
      iconPosition = "before",
      iconSize = "medium",
    } = this.props;

    return (
      <StyledButton
        buttonStyle={this.getButtonStyle()}
        fontSize={this.getFontSize()}
        padding={this.getPadding()}
        height={this.getHeight()}
        disabled={disabled}
        size={size}
        iconPosition={iconPosition}
        iconSize={iconSize}
      >
        <InnerBorder />
        {icon &&
          (typeof icon === "string" ? (
            <Icon name={icon} className="dsButtonIcon" />
          ) : (
            <div className="dsButtonIcon">{icon}</div>
          ))}
        {this.props.children}
      </StyledButton>
    );
  };
}

const Button = withTheme(BasicButton);

export default Button;
