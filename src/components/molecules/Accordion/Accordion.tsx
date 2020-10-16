import React from "react";
import styled from "styled-components";

import Collapsible from "../../atoms/Collapsible";

type AccordionContent = { collapsedContent: React.ReactNode; openContent: React.ReactNode };

interface IAccordionContainerProps {
  width?: number;
}

export const accordionWidthCalculator = (props: IAccordionContainerProps): string =>
  props.width ? `${props.width}rem` : "100%";

const AccordionContainer = styled.div<IAccordionContainerProps>`
  width: ${accordionWidthCalculator};
`;

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

      // We check if the panel index (i.e. 0) is locked. If not, we add or remove it from open

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
