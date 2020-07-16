import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

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
};

StyledLabel.displayName = "StyledLabel";

type LabelProps = React.HTMLProps<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({className, id, htmlFor, children}) => {
  return (
    <StyledLabel className={className} id={id} htmlFor={htmlFor}>
      {children}
    </StyledLabel>
  );
};

Label.displayName = "Label";

export default Label;
