import React from "react";
import styled from "styled-components";

import { colourPalette } from "../../../brandColours";
import Icon from "../Icon";

const StyledLuggageLabel = styled.div`
  display: inline-block;
  position: relative;
  color: ${props => props.theme.secondary.main.on};
  :before,
  :after {
    content: "";
    position: absolute;
    left: 0;
    right: 0.85rem;
    bottom: 100%;
    border-bottom: 0.85rem solid ${props => props.theme.secondary.main.hex};
    border-left: 0.85rem solid transparent;
    width: 5px;
  }
  :before {
    bottom: 100%;
    top: 0;
    border-bottom: 0.95rem solid ${props => props.theme.secondary.main.hex};
  }
  :after {
    bottom: auto;
    top: 0.95rem;
    border-bottom: none;
    border-top: 0.95rem solid ${props => props.theme.secondary.main.hex};
  }
`;

StyledLuggageLabel.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledLuggageLabel.displayName = "StyledLuggageLabel";

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  min-height: 1.9rem;
  margin-left: 0.85rem;
  background-color: ${props => props.theme.secondary.main.hex};
  svg {
    vertical-align: text-bottom;
    margin-left: 0.5rem;
  }
`;

StyledLabel.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledLabel.displayName = "StyledLabel";

interface ILuggageLabelProps {
  editMode?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  iconColour?: string;
  iconColourShade?: string;
}

type Props = ILuggageLabelProps & React.HTMLProps<HTMLDivElement>;

const LuggageLabel: React.FC<Props> = ({
  editMode = false,
  iconColour = "complimentary",
  ...otherProps
}: Props) => {
  const { children, onClick, iconColourShade, id, className } = otherProps;

  const luggageLabelClassName = className ? `LuggageLabel ${className}` : "LuggageLabel";

  return (
    <StyledLuggageLabel id={id} className={luggageLabelClassName}>
      <StyledLabel>
        {children}
        <Icon
          name="times"
          color={iconColour}
          shade={iconColourShade}
          isVisible={editMode}
          onClick={onClick}
        />
      </StyledLabel>
    </StyledLuggageLabel>
  );
};

export default LuggageLabel;
