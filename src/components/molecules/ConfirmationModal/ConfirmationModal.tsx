import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import Button from "../../atoms/Button";
import zIndexes from "../../../zIndexes";
import { colourPalette } from "../../../brandColours";

export const HeaderBar = styled.div`
  width: 100%;
  background-color: ${props => props.theme.primary.main.hex};
  height: 40px;
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
  margin-bottom: 20px;
  justify-content: center;
  > * + * {
    margin-left: 3rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonText = styled.p`
  font-size: 20px;
  margin: 0 20px;
`;

const customStyles = {
  overlay: {
    zIndex: zIndexes.modal,
  },
  content: {
    overflow: "visible",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 0,
    width: "700px",
    height: "300px",
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
}
export const ConfirmationModal: React.FunctionComponent<IConfirmationModal> = props => (
  <ReactModal isOpen={props.isOpen} style={customStyles} id={props.id} className={props.className}>
    <InsideContainer className={props.classNameHooks?.container}>
      <HeaderBar />
      <ContentContainer>{props.children}</ContentContainer>
      <ButtonRow>
        <Button onClick={props.onYes}>
          <ButtonText>Yes</ButtonText>
        </Button>
        <Button onClick={props.onNo} buttonType="outline">
          <ButtonText>No</ButtonText>
        </Button>
      </ButtonRow>
    </InsideContainer>
  </ReactModal>
);

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
