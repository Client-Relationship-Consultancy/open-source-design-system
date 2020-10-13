import React from "react";

import Collapsible from "../../atoms/Collapsible";

type AccordionContent = { collapsedContent: React.ReactNode; openContent: React.ReactNode };

interface IAccordionProps {
  open: number[];
  locked?: number[];
  clickHandler: () => void;
  content: AccordionContent[];
}

class Accordion extends React.Component<IAccordionProps> {
  renderPanels = (): JSX.Element[] => {
    const { content, clickHandler, open, locked = [] } = this.props;

    const panels = content.map((item: AccordionContent, index: number) => (
      <Collapsible
        /* eslint-disable react/no-array-index-key */
        key={`collapsible-${index}`}
        index={index}
        open={open.includes(index)}
        locked={locked.includes(index)}
        collapsedContent={item.collapsedContent}
        clickHandler={clickHandler}
      >
        {item.openContent}
      </Collapsible>
    ));

    return panels;
  };

  render(): JSX.Element {
    const panels = this.renderPanels();

    return <div>{panels}</div>;
  }
}

export default Accordion;
