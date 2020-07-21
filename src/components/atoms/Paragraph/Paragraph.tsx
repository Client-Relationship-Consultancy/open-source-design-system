import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

interface IStyledParagraph {
  lastParagraph?: boolean;
}

const StyledParagraph = styled.p<IStyledParagraph>`
  margin: ${props => (props.lastParagraph ? "0 0 1.5rem" : "0 0 0.5rem")};
  color: ${props => props.theme.black.main.hex};
  line-height: 1.4rem;
  font-size: 1rem;
`;

StyledParagraph.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledParagraph.displayName = "StyledParagraph";

interface IParagraphProps {
  lastParagraph?: boolean;
}

type Props = IParagraphProps & React.HTMLProps<HTMLParagraphElement>;

const Paragraph: React.FC<Props> = ({lastParagraph, children}) => {
  return <StyledParagraph lastParagraph={lastParagraph}>{children}</StyledParagraph>
};

Paragraph.defaultProps = {
  lastParagraph: false,
};

Paragraph.displayName = "Paragraph";

export default Paragraph;
