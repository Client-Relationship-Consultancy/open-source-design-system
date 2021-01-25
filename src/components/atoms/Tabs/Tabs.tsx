import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";
import zIndex from "../../../zIndexes";

export const StyledTabs = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.surface.hex};
  flex-direction: row;
  color: ${(props) => props.theme.black.main.hex};
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  width: 100%;
  align-items: stretch;
  z-index: ${zIndex.tabs};
  button {
    line-height: 1.375rem;
    font-size: 0.875rem;
    text-align: center;
    flex-grow: 1;
    background: transparent;
    border: none;
    outline-width: 0;
    padding: 0.4688rem 0;
    cursor:pointer;
  }
  button::hover {
    outline-width: 0;
  }
  button.selected {
    border-bottom: 0.125rem solid ${(props) => props.theme.action.main.hex};
    font-weight: 600;
    color: ${(props) => props.theme.action.main.hex};
  }
`;

StyledTabs.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledTabs.displayName = "StyledTabs";

interface IState {
  selected: string;
}

interface ITab {
  id: string;
  header: string | React.ReactNode | React.ReactElement;
  content: React.ReactNode | React.ReactElement;
  default?: boolean;
}

interface IProps {
  tabs: ITab[];
}

export function getDefaultTabId(tabs: ITab[]): string {
  const defaultTab = tabs.filter((tab) => tab.default);
  if (defaultTab.length > 0) {
    return defaultTab[0].id;
  }
  return tabs[0].id;
}

class Tabs extends React.Component<IProps, IState> {
  state = {
    selected: getDefaultTabId(this.props.tabs),
  };

  getSelectedTabContent = (): React.ReactNode | undefined => {
    const selectedTab = this.props.tabs.filter((tab) => tab.id === this.state.selected);
    if (selectedTab.length > 0) {
      return selectedTab[0].content;
    }
    return "No content found under this tab";
  };

  selectTab = (id: string): void => {
    this.setState({ selected: id });
  };

  render() {
    return (
      <>
        <StyledTabs>
          {this.props.tabs.map((tab) => (
            <button
              className={this.state.selected === tab.id ? "selected" : undefined}
              onClick={this.selectTab.bind(this, tab.id)}
              type="button"
              key={tab.id}
            >
              {tab.header}
            </button>
          ))}
        </StyledTabs>
        {this.state.selected && this.getSelectedTabContent()}
      </>
    );
  }
}

export default Tabs;
