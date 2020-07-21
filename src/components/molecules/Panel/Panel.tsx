import React from "react";
import styled from "styled-components"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AnimateHeight from "react-animate-height";
import { colourPalette } from "../../../brandColours"

import Icon from "../../atoms/Icon"

export const PanelButton = styled.button`
display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.5rem;
  padding: 0;
  margin: 0.5rem 0;
  text-decoration: none;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  color: ${props => props.theme.action.main.hex};
  path {
    fill: ${props => props.theme.action.main.hex};
  }
  :hover {
    cursor: pointer;
  }
  :focus {
      outline: none;
  }
`
PanelButton.defaultProps = {
    theme: colourPalette.examplePalette,
  }

PanelButton.displayName = "PanelButton"

const StyledIcon = styled(Icon)`
transform: scale(0.8, 1.25);
    margin-right: 0.5rem;
`
StyledIcon.displayName = "StyledIcon"

interface IArrowIconProps {
    flipped: boolean;
}

export const ArrowIcon = styled(Icon)<IArrowIconProps>`
    margin-left: 0.5rem;
    padding-top: 0.1rem;
    svg {
        transform: scaleY(${(props) => props.flipped ? -1 : 1});
        transition: transform 0.3s ease-in-out;
    }
`
ArrowIcon.displayName = "ArrowIcon"

interface IPanelProps {
    defaultOpen: boolean;
    icon?: IconProp;
    label: string | React.ReactNode; 
    children: React.ReactNode;
}

interface IPanelState {
    open: boolean;
}

class Panel extends React.PureComponent<IPanelProps, IPanelState> {
    state: IPanelState = {
        open: this.props.defaultOpen,
    }

    toggleOpen = () => {
        this.setState(prevState => ({ 
            open: !prevState.open, 
        }));
    }

    render(){
        return (
            <>
                <PanelButton onClick={this.toggleOpen}>
                    {this.props.icon ? <StyledIcon name={this.props.icon} size="1x" /> : null }
                    {this.props.label}
                    <ArrowIcon name="chevron-down" size="1x" flipped={this.state.open} />
                </PanelButton>
                <AnimateHeight height={this.state.open ? "auto" : 0} duration={250}>
                    {this.props.children}
                </AnimateHeight>
            </>
        );
    }
}

export default Panel;
