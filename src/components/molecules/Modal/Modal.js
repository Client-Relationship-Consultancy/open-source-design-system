import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import Button from "../../atoms/Button"
import { colourPalette } from "../../../brandColours.ts"

library.add(faTimes)

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
  background-color: ${props => props.theme.surface.hex};
  border-radius: 10px;
`
ModalBox.defaultProps = {
  theme: colourPalette.examplePalette,
}
ModalBox.displayName = "ModalBox"

const ModalBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(${props => props.theme.black.tint80.RGB}, 0.8);
`
ModalBackground.defaultProps = {
  theme: colourPalette.examplePalette,
}
ModalBackground.displayName = "ModalBackground"

const ModalContainer = styled.div`
  padding: 1rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`
ModalContainer.displayName = "ModalContainer"

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
`
ModalBody.displayName = "ModalBody"

const CloseModalButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.secondary.main.hex};
  font-size: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  > p {
    margin: 0 0.5rem 0 0;
  }
  :hover {
    cursor: pointer;
    color: ${props => props.theme.secondary.dark.hex};
  }
`
CloseModalButton.defaultProps = {
  theme: colourPalette.examplePalette,
}
CloseModalButton.displayName = "CloseModalButton"

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  showModal() {
    this.setState({ modal: true })
  }

  closeModal() {
    this.setState({ modal: false })
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
    )
    return (
      <div id={this.props.id} className={this.props.className}>
        <Button onClick={this.showModal}>{this.props.label}</Button>
        {this.state.modal ? ShowModal : ""}
      </div>
    )
  }
}
Modal.displayName = "Modal"

Modal.propTypes = {
  children: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
}

export default Modal
