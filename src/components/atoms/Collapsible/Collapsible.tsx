import React from "react";
import styled from "styled-components";

import Icon from "../Icon";

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
`;

const CollapsiblePanel = styled.div`
  position: relative;
  font-size: 1rem;
  min-height: 2em;
  width: 100%;
`;

CollapsiblePanel.displayName = "CollapsiblePanel";

interface ICollapsibleIconProps {
  open: boolean;
}

const CollapsibleIcon = styled(Icon)<ICollapsibleIconProps>`
  svg {
    transform: ${({ open }) => (open ? "rotateZ(180deg)" : "rotateZ(0deg)")};
    transition: transform 0.5s;
  }
`;

const CollapsedContentContainer = styled.div``;

CollapsedContentContainer.displayName = "CollapsedContentContainer";

interface IOpenContentContainerProps {
  open: boolean;
}

const OpenContentContainer = styled.div<IOpenContentContainerProps>`
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  height: ${({ open }) => (open ? "100%" : "0%")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition-duration: 0s, 1s, 1s;
  transition-delay: ${({ open }) => (open ? "0s" : "1s")}, 0s, 0s;
  transition-property: visibility, height, opacity;
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
      <StyledButton type="button" data-index={index} onClick={clickHandler}>
        <CollapsibleIcon name="chevron-down" size="1x" open={open} />
      </StyledButton>
      {collapsedContent && (
        <CollapsedContentContainer>{collapsedContent}</CollapsedContentContainer>
      )}
      <OpenContentContainer open={open}>{children}</OpenContentContainer>
    </CollapsiblePanel>
  );
};

Collapsible.displayName = "Collapsible";

export default Collapsible;
