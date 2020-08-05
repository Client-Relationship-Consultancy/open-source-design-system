import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../brandColours";

interface ICardCollapsibleContainerProps {
  collapsed?: boolean;
}

interface ICardBodyProps {
  bodyPadding?: boolean;
}

interface ICardContainerProps extends ICardCollapsibleContainerProps {
  boxShadow?: boolean;
}

interface ICardProps extends ICardContainerProps, ICardBodyProps {
  title?: string | React.ReactNode;
  footer?: React.ReactNode;
  id?: string;
  className?: string;
}

const CardContainer = styled.div<ICardContainerProps>`
  width: 100%;
  border-top: 4px solid ${props => props.theme.primary.main.hex};
  background-color: ${props => props.theme.surface.hex};
  box-shadow: ${props => (props.boxShadow ? `0 4px 8px ${props.theme.black.tint60.hex}` : null)};
  border-radius: ${props => (!props.collapsed ? "0 0 10px 10px" : null)};
`;
CardContainer.defaultProps = {
  theme: colourPalette.examplePalette,
};
CardContainer.displayName = "CardContainer";

const CardHeader = styled.div`
  padding: 1rem 1rem 0.5rem;
  border-bottom: 1px solid ${props => props.theme.primary.light.hex};
  > h2 {
    margin: 0;
    color: ${props => props.theme.primary.main.hex};
  }
  display: block;
`;
CardHeader.defaultProps = {
  theme: colourPalette.examplePalette,
};
CardHeader.displayName = "CardHeader";

const CardBody = styled.div<ICardBodyProps>`
  padding: ${props => (props.bodyPadding ? "0 1rem" : "0")};
`;
CardBody.displayName = "CardBody";

const CardFooter = styled.div`
  background-color: rgba(${props => props.theme.secondary.main.RGB}, 0.4);
  border-radius: 0 0 10px 10px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-flow: wrap row-reverse;
`;
CardFooter.defaultProps = {
  theme: colourPalette.examplePalette,
};

const CollapsibleContainer = styled.div<ICardCollapsibleContainerProps>`
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
  max-height: ${props => (props.collapsed ? "0" : "125rem")};
`;
CollapsibleContainer.displayName = "CollapsibleContainer";

CardFooter.displayName = "CardFooter";

const Card: React.FunctionComponent<ICardProps> = props => {
  const { title, children, footer, bodyPadding, boxShadow, collapsed, id, className } = props;
  return (
    <CardContainer boxShadow={boxShadow} collapsed={collapsed} id={id} className={className}>
      {/* If heading exists and it is a string, it will be place in a h2 tag.
      Otherwise, pass a component and control styling yourself */}
      {title ? (
        <CardHeader className="Card__CardHeader">
          {typeof title === "string" ? <h2>{title}</h2> : title}
        </CardHeader>
      ) : null}
      <CollapsibleContainer collapsed={collapsed}>
        <CardBody bodyPadding={bodyPadding} className="Card__CardBody">
          {children}
        </CardBody>

        {footer ? <CardFooter>{footer}</CardFooter> : null}
      </CollapsibleContainer>
    </CardContainer>
  );
};
Card.displayName = "Card";

export default Card;
