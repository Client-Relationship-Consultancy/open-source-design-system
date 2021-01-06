import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import Button, { IconButton } from "../../atoms/Button";
import zIndexes from "../../../zIndexes";
import { colourPalette } from "../../../brandColours";

interface IWithTitleProps extends React.HTMLProps<HTMLDivElement> {
  withTitle: boolean;
  theme: any;
}

export const HeaderBar = styled.div`
  width: 100%;
  height: ${(props: IWithTitleProps) => (props.withTitle ? "56px" : "46px")};
  border-bottom: 1px solid
    ${(props: IWithTitleProps) => (props.withTitle ? props.theme.primary.main.hex : "transparent")};
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 0 9.6px;
  h1 {
    font-size: 22px;
    font-weight: 500;
    line-height: 26.4px;
    color: ${(props: IWithTitleProps) => props.theme.primary.main.hex};
    margin-left: 22.4px;
  }
`;
HeaderBar.defaultProps = {
  theme: colourPalette.examplePalette,
};

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: flex-end;
  padding: 0 18px;
  > * + * {
    margin-left: 18px;
  }
`;

const ContentContainer = styled.p`
  display: flex;
  justify-content: flex-start;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 300;
  line-height: 19.2px;
  font-style: normal;
  margin: 21px 0;
  margin-top: ${(props: IWithTitleProps) => (props.withTitle ? "21px" : "0")};
`;

const ButtonText = styled.p`
  font-size: 14px;
  line-height: 22px;
  padding: 2px;
`;

ButtonText.displayName = "ButtonText";

const customStyles = {
  overlay: {
    zIndex: zIndexes.modal,
  },
  content: {
    overflow: "hidden",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 0,
    width: "700px",
    height: "fit-content",
    borderRadius: "1rem",
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
            <ButtonText className="noButton">{noButtonLabel}</ButtonText>
          </Button>
          <Button onClick={onYes} buttonType="primary" buttonSize="medium">
            <ButtonText className="yesButton">{yesButtonLabel}</ButtonText>
          </Button>
        </ButtonRow>
      </InsideContainer>
    </ReactModal>
  );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
