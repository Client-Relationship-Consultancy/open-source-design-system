export const colourPalette = {
  examplePalette: {
    primary: {
      main: {
        hex: "#A42824",
        RGB: "164,40,36",
        on: "#FFFFFF",
      },
      light: {
        hex: "#DA342F",
        RGB: "218,52,47",
        on: "#FFFFFF",
      },
      dark: {
        hex: "#661614",
        RGB: "102,22,20",
        on: "#FFFFFF",
      },
    },
    secondary: {
      main: {
        hex: "#0B466B",
        RGB: "11,70,107",
        on: "#FFFFFF",
      },
      light: {
        hex: "#599CAF",
        RGB: "89,156,175",
        on: "#FFFFFF",
      },
      dark: {
        hex: "#05263B",
        RGB: "5,38,59",
        on: "#FFFFFF",
      },
    },
    complimentary: {
      main: {
        hex: "#FFEE52",
        RGB: "255,238,82",
        on: "#272727",
      },
      light: {
        hex: "#FFF59D",
        RGB: "255,245,157",
        on: "#272727",
      },
      dark: {
        hex: "#CEB900",
        RGB: "206,185,0",
        on: "#272727",
      },
    },
    action: {
      main: {
        hex: "#743C8F",
        RGB: "116,60,143",
        on: "#FFFFFF",
      },
      light: {
        hex: "#AD65CF",
        RGB: "173,101,207",
        on: "#FFFFFF",
      },
      dark: {
        hex: "#4E2662",
        RGB: "79,38,98",
        on: "#FFFFFF",
      },
    },
    error: {
      main: {
        hex: "#FF7320",
        RGB: "255,115,32",
        on: "#FFFFFF",
      },
      dark: {
        hex: "#C54901",
        RGB: "197,73,1",
        on: "#FFFFFF",
      },
    },
    background: {
      hex: "#F6F6F6",
      RGB: "246,246,246",
      on: "#272727",
    },
    surface: {
      hex: "#FFFFFF",
      RGB: "255,255,255",
      on: "#272727",
    },
    white: {
      hex: "#FFFFFF",
      RGB: "255,255,255",
      on: "#272727",
    },
    black: {
      main: { hex: "#272727", RGB: "39,39,39", on: "#FFFFFF" },
      tint80: { hex: "#696969", RGB: "105,105,105", on: "#FFFFFF" },
      tint60: { hex: "#A0A0A0", RGB: "160,160,160", on: "#FFFFFF" },
      tint40: { hex: "#C7C7C7", RGB: "199,199,199", on: "#272727" },
      tint20: { hex: "#ECECEC", RGB: "236,236,236", on: "#272727" },
    },
  },
};

interface IColourCodes {
  hex: string;
  RGB: string;
  on: string;
}
interface IColourVariations {
  main: IColourCodes;
  light?: IColourCodes;
  dark?: IColourCodes;
}

interface IBlackVariations {
  main: IColourCodes;
  tint80: IColourCodes;
  tint60: IColourCodes;
  tint40: IColourCodes;
  tint20: IColourCodes;
}

export interface IColourPalette {
  primary: IColourVariations;
  secondary: IColourVariations;
  complimentary: IColourVariations;
  action: IColourVariations;
  error: IColourVariations;
  background: IColourCodes;
  surface: IColourCodes;
  white: IColourCodes;
  black: IBlackVariations;
}
