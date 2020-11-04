import React from "react";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";
import { colourPalette } from "../../../brandColours";

const defaultPalette = colourPalette.examplePalette;

const StyledMenu = styled.button<{ showSubMenu: boolean }>`
  color: ${({ theme }) => theme.action.main.hex};
  font-family: "Gentona", "Montserrat";
  font-size: 0.875rem;
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  overflow: ${({ showSubMenu }) => (showSubMenu ? "visible" : "hidden")};
`;

const MenuLabel = styled.div`
  display: flex;
  padding: 0.5rem;
  > * + * {
    margin-left: 0.75rem;
  }
  :hover {
    cursor: pointer;
  }
`;

const SubMenu = styled.div<{ showSubMenu: boolean }>`
  min-width: 110%;
  margin-top: 0.1rem;
  opacity: ${({ showSubMenu }) => (showSubMenu ? 1 : 0)};
  position: absolute;
  max-width: 500%;
  white-space: nowrap;
  background-color: white;
  box-shadow: 0.1rem 0.1rem 0.5rem ${({ theme }) => theme.black.tint40.hex};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 0.2rem;
  padding: 0.25rem 0;
`;

const SubMenuItems = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0.5rem 0.75rem;
  width: 100%;
  color: ${({ theme }) => theme.black.tint80.hex};
  display: flex;
  text-align: left;
  transition: all 0.3s ease;
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.black.tint20.hex};
  }
  > * + * {
    margin-left: 0.5rem;
  }
  svg {
    max-width: 1rem;
  }
`;

interface IMenuItem {
  id?: string;
  label: string;
  icon: IconProp | SVGElement;
  onClick?: () => void;
  children?: IMenuItem[]; // This is if we plan to do another sub menu for the sub menu
}

interface IProps {
  items: IMenuItem[];
}

interface IState {
  showSubMenu: boolean;
}
export class Menu extends React.Component<IProps, IState> {
  private componentRef = React.createRef<HTMLButtonElement>();

  state = {
    showSubMenu: false,
  };

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  handleClickOutside = (event: any) => {
    if (this.componentRef.current && !this.componentRef.current.contains(event.target)) {
      this.setState({ showSubMenu: false });
    }
  };

  renderSubMenuItems = () => {
    return this.props.items.map((item) => {
      return (
        <SubMenuItems key={item.id} onClick={item.onClick}>
          {item.icon && typeof item?.icon === "string" ? <Icon name={item.icon} /> : item.icon}
          <span>{item.label}</span>
        </SubMenuItems>
      );
    });
  };

  openSubMenu = () => {
    this.setState((prevState) => ({ showSubMenu: !prevState.showSubMenu }));
  };

  render = () => {
    return (
      <StyledMenu
        showSubMenu={this.state.showSubMenu}
        onClick={this.openSubMenu}
        ref={this.componentRef}
      >
        <MenuLabel>
          <span>Bulk Actions</span>
          <Icon name="chevron-down" color="action" />
        </MenuLabel>
        <SubMenu showSubMenu={this.state.showSubMenu} className="subMenu">
          {this.renderSubMenuItems()}
        </SubMenu>
      </StyledMenu>
    );
  };
}
