import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

import Collapsible from "../../atoms/Collapsible";

type AccordionContent = { collapsedContent: React.ReactNode; openContent: React.ReactNode };

interface IAccordionContainerProps {
  width?: number;
}

const AccordionContainer = styled.div<IAccordionContainerProps>`
  width: ${({ width }) => (width ? `${width}rem` : "100%")};
  background-color: ${({ theme }) => theme.background.hex};
`;

AccordionContainer.defaultProps = {
  theme: colourPalette.examplePalette,
};

interface IAccordionProps {
  open: number[];
  locked: number[];
  updateOpenPanels: (updatedOpenPanels: number[]) => void;
  content: AccordionContent[];
  width?: number;
}

class Accordion extends React.Component<IAccordionProps> {
  handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { open, locked } = this.props;

    const updatedOpen = [...open];

    if (event.currentTarget.dataset.index) {
      const index = parseInt(event.currentTarget.dataset.index, 10);

      if (!locked.includes(index)) {
        const existingIndex = updatedOpen.findIndex((val) => val === index);
        if (existingIndex > -1) {
          updatedOpen.splice(existingIndex, 1);
        } else {
          updatedOpen.push(index);
        }
      }
    }

    return updatedOpen;
  };

  renderPanels = (): JSX.Element[] => {
    const { content, updateOpenPanels, open = [], locked = [] } = this.props;

    const panels = content.map((item: AccordionContent, index: number) => (
      <Collapsible
        /* eslint-disable react/no-array-index-key */
        key={`collapsible-${index}`}
        index={index}
        open={open.includes(index)}
        locked={locked.includes(index)}
        collapsedContent={item.collapsedContent}
        clickHandler={(event) => {
          updateOpenPanels(this.handleOnClick(event));
        }}
      >
        {item.openContent}
      </Collapsible>
    ));

    return panels;
  };

  render(): JSX.Element {
    const { width } = this.props;

    return <AccordionContainer width={width}>{this.renderPanels()}</AccordionContainer>;
  }
}

export default Accordion;
