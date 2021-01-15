import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import Button, { IconButton } from "../../atoms/Button";
import zIndexes from "../../../zIndexes";
import { colourPalette } from "../../../brandColours";

interface IWithTitleProps extends React.HTMLProps<HTMLDivElement> {
  withTitle: boolean;
}

export const HeaderBar = styled.div<IWithTitleProps>`
  width: 100%;
  height: ${({ withTitle }) => (withTitle ? "3.5rem" : "2.875rem")};
  border-bottom: 0.0625rem solid
    ${({ withTitle, theme }) => (withTitle ? theme.primary.main.hex : "transparent")};
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
  h1 {
    font-size: 1.375rem;
    font-weight: 500;
    line-height: 1.65rem;
    color: ${({ theme }) => theme.primary.main.hex};
    margin-left: 1.4rem;
  }
`;
HeaderBar.defaultProps = {
  theme: colourPalette.examplePalette,
};

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: flex-end;
  padding: 0 1.125rem;
  > * + * {
    margin-left: 1.125rem;
  }
`;

export const ContentContainer = styled.p<IWithTitleProps>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 2rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  font-style: normal;
  margin: 1.3125rem 0;
  margin-top: ${({ withTitle }) => (withTitle ? "1.3125rem" : "0")};
`;


const customStyles = {
  overlay: {
    zIndex: zIndexes.modal,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    overflow:"visible",
    margin: "auto",
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
    padding: 0,
    width: "43.75rem",
    borderRadius: "0.625rem",
    boxShadow: "0px 0px 16px #696969",
  },
};

export interface IConfirmationModal {
  isOpen: boolean;
  onYes: (e: React.SyntheticEvent) => void;
  onNo: (e: React.SyntheticEvent) => void;
  id?: string;
  className?: string;
  classNameHooks?: {
    container?: string;
  };
  yesButtonLabel?: string | React.ReactNode;
  noButtonLabel?: string | React.ReactNode;
  title?: string | React.ReactNode;
}
export const ConfirmationModal: React.FunctionComponent<IConfirmationModal> = (props) => {
  const {
    isOpen,
    id,
    className,
    children,
    onYes,
    onNo,
    classNameHooks,
    yesButtonLabel = "Yes",
    noButtonLabel = "No",
    title,
  } = props;
  return (
    <ReactModal isOpen={isOpen} style={customStyles} id={id} className={className}>
      <InsideContainer className={classNameHooks?.container}>
        <HeaderBar withTitle={!!title}>
          <IconButton buttonSize="large" buttonType="ghost" icon="times" onClick={onNo} />
          {title && <h1>{title}</h1>}
        </HeaderBar>
        <ContentContainer withTitle={!!title}>{children}</ContentContainer>
        <ButtonRow>
          <Button onClick={onNo} buttonType="ghost" buttonSize="medium">
            <span className="modal_noButtonLabel">{noButtonLabel}</span>
          </Button>
          <Button onClick={onYes} buttonType="primary" buttonSize="medium">
            <span className="modal_yesButtonLabel">{yesButtonLabel}</span>
          </Button>
        </ButtonRow>
      </InsideContainer>
    </ReactModal>
  );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
