import React from "react"
import styled from "styled-components"
import { colourPalette } from "../../../brandColours"

const StyledLabel = styled.label`
  display: block;
  color: ${props => props.theme.black.main.hex};
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  :hover {
    cursor: pointer;
  }
`;

StyledLabel.defaultProps = {
  theme: colourPalette.examplePalette,
}

StyledLabel.displayName = "StyledLabel";

interface ILabel {
  className?: string;
  id?: string;
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<ILabel> = ({className, id, htmlFor, children}): JSX.Element => {
  return (
    <StyledLabel className={className} id={id} htmlFor={htmlFor}>
      {children}
    </StyledLabel>
  );
}

Label.displayName = "Label";

export default Label;
