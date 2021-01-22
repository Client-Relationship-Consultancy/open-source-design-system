import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

const StyledTabs = styled.div`
  display: flex;
  position:sticky;
  top:0;
  background:${(props) => props.theme.surface.hex};
  flex-direction: row;
  color: ${(props) => props.theme.black.main.hex};
  font-size: 1rem;
  font-family: "Gentona", "Montserrat";
  width: 100%;
  align-items: stretch;
  button {
    line-height: 22px;
    font-size: 14px;
    text-align: center;
    flex-grow: 1;
    background: transparent;
    border: none;
    outline-width: 0;
    padding: 7.5px 0;
  }
  button::hover {
    outline-width: 0;
  }
  button.selected {
    border-bottom: 2px solid ${(props) => props.theme.action.main.hex};
    font-weight: 600;
    color: ${(props) => props.theme.action.main.hex};
  }
`;

StyledTabs.defaultProps = {
  theme: colourPalette.examplePalette,
};

StyledTabs.displayName = "StyledTabs";

// type TabsProps = React.HTMLProps<HTMLTabsElement>;
interface IState {
  selected: string;
}

interface ITab {
  id: string;
  header: string;
  content: React.ReactNode | React.ReactElement;
  default?: boolean;
}

interface IProps {
  tabs: ITab[];
}

function getDefaultTabId(tabs: ITab[]): string {
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
    return undefined;
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
