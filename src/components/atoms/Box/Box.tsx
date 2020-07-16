import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

const StyledBox = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > * {
    padding: 0.5rem 1rem;
  }
  ${props =>
    props.onClick &&
    `
    :hover {
      cursor: pointer;
    }
  `}
`;

StyledBox.displayName = "StyledBox";

const Title = styled.div`
  background-color: ${props => props.theme.primary.main.hex};
  width: 100%;
  border-radius: 10px 10px 0 0;
  > h4 {
    margin: 0;
    color: ${props => props.theme.primary.main.on};
    font-size: 1.2rem;
  }
`;

Title.defaultProps = {
  theme: colourPalette.examplePalette,
};

Title.displayName = "Title";

interface IBodyProps {
  flatTop: boolean;
}

const Body = styled.div<IBodyProps>`
  background-color: ${props => props.theme.surface.hex};
  border-radius: ${props => (props.flatTop ? "0 0 10px 10px" : "10px")};
  border: 1px solid ${props => props.theme.primary.main.hex};
`;

Body.defaultProps = {
  theme: colourPalette.examplePalette,
};

Body.displayName = "Body";

type DivProps = React.HTMLProps<HTMLDivElement>;

const Box: React.FC<DivProps> = ({ title, children, id, className, onClick }) => {
  return (
    <StyledBox id={id} className={className} onClick={onClick}>
      {title && (
        <Title>
          <h4>{title}</h4>
        </Title>
      )}
      <Body flatTop={!!title}>{children}</Body>
    </StyledBox>
  )
};

Box.displayName = "Box";

export default Box;
