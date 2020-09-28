import { IColourPalette } from "../../../brandColours";

interface IButtonStyleOptions {
  border?: string;
  background?: string;
  color?: string;
  iconColor?: string;
  fontWeight?: string;
  textDecoration?: string;
  boxShadow?: string;
  shadow?: string;
}

export interface IButtonStyle extends IButtonStyleOptions {
  hover: IButtonStyleOptions;
  focus: IButtonStyleOptions;
}

export const buttonStyles = (theme: IColourPalette) => ({
  default: {
    border: theme.action.main.hex,
    background: theme.action.main.hex,
    color: theme.action.main.on,
    iconColor: theme.action.main.on,
    hover: {
      background: theme.action.dark?.hex,
      color: theme.action.dark?.on,
      border: theme.action.dark?.hex,
    },
    focus: {
      border: theme.white.hex,
      boxShadow: `0 0 0 0.1rem  ${theme.action.main.hex}`,
    },
  },
  outline: {
    border: theme.action.main.hex,
    background: "transparent",
    color: theme.action.main.hex,
    iconColor: theme.action.main.hex,
    fontWeight: "700",
    hover: {
      background: "transparent",
      color: theme.action.dark?.hex,
      border: `0.1rem solid ${theme.action.dark?.hex}`,
      iconColor: theme.action.dark?.hex,
    },
    focus: {
      border: theme.action.main.hex,
      textDecoration: "underline",
    },
  },
  complimentary: {
    background: theme.complimentary.main.hex,
    border: theme.complimentary.main.hex,
    color: theme.white.hex,
    hover: {
      background: theme.complimentary.dark?.hex,
      border: theme.complimentary.dark?.hex,
      color: theme.white.hex,
    },
    focus: {
      background: theme.complimentary.dark?.hex,
      border: theme.white.hex,
      shadow: theme.complimentary.dark?.hex, // is this a thing, or should it be boxshadow?
      color: theme.white.hex,
    },
  },
  ghost: {
    border: "transparent",
    background: "transparent",
    color: theme.action.main.hex,
    iconColor: theme.action.main.hex,
    fontWeight: "700",
    hover: {
      background: "transparent",
      color: theme.action.dark?.hex,
      iconColor: theme.action.dark?.hex,
      border: "transparent",
    },
    focus: {
      border: "transparent",
      textDecoration: "underline",
    },
  },
  error: {
    background: theme.error.main.hex,
    border: theme.error.main.hex,
    color: theme.white.hex,
    hover: {
      background: theme.error.dark?.hex,
      border: theme.error.dark?.hex,
      color: theme.white.hex,
    },
    focus: {
      background: theme.error.dark?.hex,
      border: theme.white.hex,
      shadow: theme.error.dark?.hex,
      color: theme.white.hex,
    },
  },
});
