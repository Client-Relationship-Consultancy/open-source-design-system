import React from "react"
import { ThemeProvider } from "styled-components"
import { colourPalette, IColourPalette } from "../../../brandColours"

interface IProps{
  theme: IColourPalette;
}


const Theme: React.FunctionComponent<IProps> = props => (
  <ThemeProvider theme={props.theme || colourPalette.examplePalette}>
    <>{props.children}</>
  </ThemeProvider>
)


export default Theme
