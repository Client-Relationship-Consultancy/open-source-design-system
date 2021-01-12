import React from "react";
import styled from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../atoms/Button";
import { colourPalette } from "../../../brandColours";

library.add(faTimes);

const ModalBox = styled.div`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 80%;
  background-color: ${(props) => props.theme.surface.hex};
  border-radius: 10px;
  z-index: 9999;
`;
ModalBox.defaultProps = {
  theme: colourPalette.examplePalette,
};
ModalBox.displayName = "ModalBox";

const ModalBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(${(props) => props.theme.black.tint80.RGB}, 0.8);
`;
ModalBackground.defaultProps = {
  theme: colourPalette.examplePalette,
};
ModalBackground.displayName = "ModalBackground";

const ModalContainer = styled.div`
  padding: 1rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
ModalContainer.displayName = "ModalContainer";

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
`;
ModalBody.displayName = "ModalBody";

const CloseModalButton = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.secondary.main.hex};
  font-size: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  > p {
    margin: 0 0.5rem 0 0;
  }
  :hover {
    cursor: pointer;
    color: ${(props) => props.theme.secondary.dark.hex};
  }
`;
CloseModalButton.defaultProps = {
  theme: colourPalette.examplePalette,
};
CloseModalButton.displayName = "CloseModalButton";

const StyledContainer = styled.div`
  z-index: 10;
`;

interface IProps {
  children: (closeModal: () => void) => any;
  label: string | React.ReactNode;
  id?: string;
  className?: string;
}
interface IState {
  modal: boolean;
}

class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modal: false,
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  render() {
    const ShowModal = (
      <div>
        <ModalBackground />
        <ModalBox>
          <ModalContainer>
            <CloseModalButton onClick={this.closeModal}>
              <p>Close</p>
              <FontAwesomeIcon icon="times" />
            </CloseModalButton>
            <ModalBody>{this.props.children(this.closeModal)}</ModalBody>
          </ModalContainer>
        </ModalBox>
      </div>
    );
    return (
      <>
        <StyledContainer id={this.props.id} className={this.props.className}>
          <Button onClick={this.showModal}>{this.props.label}</Button>
        </StyledContainer>
        ,
        <span id={`Modal-${this.props.id}`} className={this.props.className}>
          {this.state.modal ? ShowModal : ""}
        </span>
        ,
      </>
    );
  }
}

export default Modal;
