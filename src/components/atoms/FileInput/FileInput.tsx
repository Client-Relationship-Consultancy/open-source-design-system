/**
 * FileInput
 */

import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { InputType } from "zlib";

/*
  WANT TO CHECK IF THIS IS NEEDED
import { colourPalette } from "../../../brandColours";
*/

interface IContainer {
  selectedFile: File | null;
}

export const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  .inputFile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  button {
    pointer-events: ${props => (props.selectedFile ? "auto" : "none")};
  }
  .inputFile + label {
    cursor: pointer;
  }
`;

/*
  WANT TO CHECK IF THIS IS NEEDED
  Container.defaultProps = {
    theme: colourPalette.examplePalette,
  };
*/

Container.displayName = "Container";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

ButtonContainer.displayName = "ButtonContainer";

/*
  NEEDS REVIEW AFTER EVERYTHING IN
*/
interface IProps {
  chooseFileMessage: string;
  uploadMessage: string;
  handleUpload: (file: File | null) => void; // will this work with defaultprop????
  theme: string; //hmmmm. is there a type that we can use here to be more specific?
  id?: string; //needed?
  className?: string; //needed?
}

interface IState {
  selectedFile: File | null;
}

type DefaultProps = Pick<IProps, "chooseFileMessage" | "uploadMessage" | "handleUpload" | "theme">;

class FileInput extends React.PureComponent<IProps, IState> {
  static defaultProps: DefaultProps = {
    chooseFileMessage: "Choose file",
    uploadMessage: "Upload file",
    theme: "outline",
    handleUpload: () => undefined, // remove this default once all FileInputs pass handleUpload prop
  };

  state: IState = { selectedFile: null };

  fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    this.setState({ selectedFile: file });
  };

  resetFile = () => this.setState({ selectedFile: null });

  handleUpload = () => this.props.handleUpload(this.state.selectedFile);

  render() {
    return (
      <Container
        selectedFile={this.state.selectedFile}
        id={this.props.id}
        className={this.props.className}
      >
        <input
          type="file"
          onChange={this.fileChangedHandler}
          id="fileInput"
          className="inputFile"
        />
        <ButtonContainer>
          <label htmlFor="fileInput">
            <Button
              onClick={this.handleUpload}
              buttonType={this.props.theme}
              icon={this.state.selectedFile ? "upload" : "file"}
              id="uploadButton"
              type="button"
            >
              {this.state.selectedFile ? this.props.uploadMessage : this.props.chooseFileMessage}
            </Button>
          </label>
          {this.state.selectedFile && (
            <Button buttonType="ghost" icon="times" onClickIcon={this.resetFile} type="button">
              {this.state.selectedFile.name}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default FileInput;
