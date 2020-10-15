import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

import Icon from "../Icon";

interface ICollapsiblePanelButton {
  locked: boolean;
}

const CollapsiblePanelButton = styled.button<ICollapsiblePanelButton>`
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};
`;

CollapsiblePanelButton.displayName = "CollapsiblePanelButton";

const CollapsiblePanel = styled.div`
  position: relative;
  width: 100%;
`;

CollapsiblePanel.displayName = "CollapsiblePanel";

interface ICollapsibleIconProps {
  open: boolean;
  locked: boolean;
}

const CollapsibleIcon = styled(Icon)<ICollapsibleIconProps>`
  svg {
    color: ${({ locked, theme }) => (locked ? theme.black.tint60.hex : theme.secondary.dark.hex)};
    transform: ${({ open }) => (open ? "rotateZ(-180deg)" : "rotateZ(0deg)")};
    transition: transform 0.5s 0s ease-out;
  }
`;

CollapsibleIcon.displayName = "CollapsibleIcon";

CollapsibleIcon.defaultProps = {
  theme: colourPalette.examplePalette,
};

const CollapsedContentContainer = styled.div`
  min-height: 2.25rem;
`;

CollapsedContentContainer.displayName = "CollapsedContentContainer";

interface IOpenContentContainerProps {
  open: boolean;
}

const OpenContentContainer = styled.div<IOpenContentContainerProps>`
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  max-height: ${({ open }) => (open ? "50rem" : "0rem")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition-property: visibility, max-height, opacity;
  transition-duration: 0s, ${({ open }) => (open ? "0.5s" : "0.5s")}, 0.5s;
  transition-delay: ${({ open }) => (open ? "0" : "0.5s")}, 0s, 0s;
  transition-timing-function: ${({ open }) => (open ? "ease-in" : "ease-out")};
`;

OpenContentContainer.displayName = "OpenContentContainer";

interface ICollapsibleProps {
  open: boolean;
  locked?: boolean;
  children: React.ReactNode;
  collapsedContent?: React.ReactNode;
  width?: number;
  index: number;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Collapsible: React.FC<ICollapsibleProps> = (props) => {
  const { locked = false, open, children, collapsedContent, clickHandler, index } = props;

  return (
    <CollapsiblePanel>
      <CollapsiblePanelButton
        locked={locked}
        type="button"
        data-index={index}
        onClick={clickHandler}
      >
        <CollapsibleIcon name="chevron-down" size="2x" open={open} locked={locked} />
      </CollapsiblePanelButton>
      <CollapsedContentContainer>{collapsedContent}</CollapsedContentContainer>
      <OpenContentContainer open={open}>{children}</OpenContentContainer>
    </CollapsiblePanel>
  );
};

Collapsible.displayName = "Collapsible";

export default Collapsible;
