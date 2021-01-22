import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

// const StyledTabs = styled.tabs`
//   display: block;
//   color: ${props => props.theme.black.main.hex};
//   font-size: 1rem;
//   font-family: "Gentona", "Montserrat";
//   :hover {
//     cursor: pointer;
//   }
// `;

// StyledTabs.defaultProps = {
//   theme: colourPalette.examplePalette,
// };

// StyledTabs.displayName = "StyledTabs";

// type TabsProps = React.HTMLProps<HTMLTabsElement>;

const Tabs: React.FC<{}> = ({ children }) => {
  return <div />;
};

Tabs.displayName = "Tabs";

export default Tabs;
