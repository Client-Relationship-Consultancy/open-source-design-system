import React from "react";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

interface IShowSubMenu {
  showSubMenu: boolean;
}

export const StyledMenu = styled.button<IShowSubMenu>`
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

export const MenuLabel = styled.div`
  display: flex;
  padding: 0.5rem;
  > * + * {
    margin-left: 0.75rem;
  }
  :hover {
    cursor: pointer;
  }
`;

export const SubMenu = styled.div<IShowSubMenu>`
  min-width: 110%;
  margin-top: 0.1rem;
  opacity: ${({ showSubMenu }) => (showSubMenu ? 1 : 0)};
  position: absolute;
  max-width: 500%;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.surface.hex};
  box-shadow: 0.1rem 0.1rem 0.5rem ${({ theme }) => theme.black.tint40.hex};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 0.2rem;
  padding: 0.25rem 0;
`;

export const SubMenuItems = styled.button`
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
  icon?: IconProp | SVGElement | React.ReactElement;
  onClick?: () => void;
}

interface IProps {
  items: IMenuItem[];
  showMenuArrow: boolean;
  useInnerRef: boolean;
}

interface IState {
  showSubMenu: boolean;
}

type DefaultProps = Pick<IProps, "showMenuArrow" | "useInnerRef">;

export class Menu extends React.Component<IProps, IState> {
  componentRef = React.createRef<HTMLButtonElement>();

  static defaultProps: DefaultProps = {
    useInnerRef: false,
    showMenuArrow: true,
  };

  state = {
    showSubMenu: false,
  };

  componentDidMount = () => {
    document.addEventListener("mousedown", this.closeMenuWhenClickedOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.closeMenuWhenClickedOutside);
  };

  closeMenuWhenClickedOutside = (event: MouseEvent) => {
    // Have to type cast here as MouseEvent has event.target as type EventTarget
    // But React expects it to be Node instead
    const clickedArea = event.target as Node | null;
    if (this.componentRef.current && !this.componentRef.current.contains(clickedArea)) {
      this.setState({ showSubMenu: false });
    }
  };

  renderSubMenuItems = () =>
    this.props.items.map((item) => (
      <SubMenuItems key={item.id || item.label} onClick={item.onClick}>
        {item.icon && (typeof item.icon === "string" ? <Icon name={item.icon} /> : item.icon)}
        <span>{item.label}</span>
      </SubMenuItems>
    ));

  openSubMenu = () => {
    this.setState((prevState) => ({ showSubMenu: !prevState.showSubMenu }));
  };

  // innerRef is deprecated in Styled Components v4. Uses ref instead.
  // This is to allow backward compatibility for older Styled Components.
  createRefProp = () =>
    this.props.useInnerRef ? { innerRef: this.componentRef } : { ref: this.componentRef };

  render = () => {
    return (
      <StyledMenu
        showSubMenu={this.state.showSubMenu}
        onClick={this.openSubMenu}
        {...this.createRefProp()}
      >
        <MenuLabel>
          <span>{this.props.children}</span>
          {this.props.showMenuArrow ? <Icon name="chevron-down" color="action" /> : null}
        </MenuLabel>
        <SubMenu showSubMenu={this.state.showSubMenu} className="subMenu">
          {this.renderSubMenuItems()}
        </SubMenu>
      </StyledMenu>
    );
  };
}
