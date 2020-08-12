import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

const StyledList = styled.ul`
  color: ${props => props.theme.black.main.hex};
  font-size: 1rem;
  li {
    margin-bottom: 0.5rem;
  }
`;

StyledList.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledList.displayName = "StyledList";

type HTMLListProps = React.HTMLProps<HTMLOListElement> & React.HTMLProps<HTMLUListElement>;

interface Props extends HTMLListProps {
  listType?: "ul" | "ol";
  children?: React.ReactNode;
}

const List: React.FC<Props> = ({ listType = "ul", children }) => {
  return <StyledList as={listType}>{children}</StyledList>;
};

export default List;
