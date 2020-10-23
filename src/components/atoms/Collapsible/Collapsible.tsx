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

export const CollapsibleIconTransition = (props: ICollapsibleIconProps): string =>
  props.open ? "rotateZ(-180deg)" : "rotateZ(0deg)";

const CollapsibleIcon = styled(Icon)<ICollapsibleIconProps>`
  svg {
    color: ${({ locked, theme }) => (locked ? theme.black.tint60.hex : theme.secondary.dark.hex)};
    transform: ${CollapsibleIconTransition};
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
  maxHeight?: string;
}

export const OpenContentContainerVisibility = (props: IOpenContentContainerProps): string =>
  props.open ? "visible" : "hidden";
export const OpenContentContainerMaxheight = (props: IOpenContentContainerProps): string => {
  const maxHeight = props.maxHeight ? props.maxHeight : "50rem";
  return props.open ? maxHeight : "0rem";
};
export const OpenContentContainerOpacity = (props: IOpenContentContainerProps): 1 | 0 =>
  props.open ? 1 : 0;
export const OpenContentContainerTransitionduration = (props: IOpenContentContainerProps): string =>
  props.open ? "0.5s" : "0.5s";
export const OpenContentContainerTransitiondelay = (props: IOpenContentContainerProps): string =>
  props.open ? "0" : "0.5s";
export const OpenContentContainerTransitiontimingfunction = (
  props: IOpenContentContainerProps,
): string => (props.open ? "ease-in" : "ease-out");

const OpenContentContainer = styled.div<IOpenContentContainerProps>`
  visibility: ${OpenContentContainerVisibility};
  max-height: ${OpenContentContainerMaxheight};
  opacity: ${OpenContentContainerOpacity};
  transition-property: visibility, max-height, opacity;
  transition-duration: 0s, ${OpenContentContainerTransitionduration}, 0.5s;
  transition-delay: ${OpenContentContainerTransitiondelay}, 0s, 0s;
  transition-timing-function: ${OpenContentContainerTransitiontimingfunction};
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
  maxHeight?: string;
}

const Collapsible: React.FC<ICollapsibleProps> = (props) => {
  const {
    locked = false,
    open,
    children,
    collapsedContent,
    clickHandler,
    maxHeight,
    index,
  } = props;

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
      <OpenContentContainer open={open} maxHeight={maxHeight}>
        {children}
      </OpenContentContainer>
    </CollapsiblePanel>
  );
};

Collapsible.displayName = "Collapsible";

export default Collapsible;
