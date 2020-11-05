import { IColourPalette } from "../../../brandColours";

export type ButtonStyle = {
  background: string;
  color: string;
  border: string;
  hover?: {
    background?: string;
    color?: string;
    border?: string;
  };
  focus?: {
    background?: string;
    color?: string;
    border?: string;
  };
};

// TODO:
// needs focus -> show inner border
// needs disabled opacity
// disabled interacting/or not with other mouse selectors (I.E. hover while disabled)
// text-decoration

export const buttonStyles = (theme: IColourPalette) => ({
  primary: {
    background: theme.action.main.hex,
    color: theme.action.main.on,
    border: theme.action.main.hex,
    hover: {
      background: theme.action.dark?.hex,
      color: theme.action.dark?.on,
      border: theme.action.dark?.hex,
    },
  },
  primaryOutline: {
    background: "transparent",
    color: theme.action.main.hex,
    border: theme.action.main.hex,
    hover: {
      background: theme.action.main.hex,
      color: theme.action.main.on,
      border: theme.action.main.hex,
    },
    focus: {
      background: theme.action.light?.hex,
      border: theme.action.light?.hex,
    },
  },
  secondaryOutline: {
    background: "transparent",
    color: theme.secondary.main.hex,
    border: theme.secondary.main.hex,
    hover: {
      background: theme.secondary.dark?.hex,
      color: theme.secondary.dark?.on,
      border: theme.secondary.dark?.hex,
    },
    focus: {
      background: theme.secondary.main.hex,
      color: theme.secondary.main.on,
      border: theme.secondary.main.hex,
    },
  },
  danger: {
    background: theme.error.main.hex,
    color: theme.error.main.on,
    border: theme.error.main.hex,
    hover: {
      background: theme.error.dark?.hex,
      color: theme.error.dark?.on,
      border: theme.error.dark?.hex,
    },
    focus: {
      background: theme.error.main.hex,
      color: theme.error.main.on,
      border: theme.error.main.hex,
    },
  },
  ghost: {
    background: "transparent",
    color: theme.action.main.hex,
    border: "transparent",
    hover: {
      background: theme.background.hex,
    },
    focus: {
      background: theme.background.hex,
      border: theme.action.main.hex,
    },
  },
});
