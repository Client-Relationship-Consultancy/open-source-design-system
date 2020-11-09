/**
 * FileInput
 */

import React from "react";
import styled from "styled-components";
import Button from "../Button";

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
    pointer-events: ${(props) => (props.selectedFile ? "auto" : "none")};
  }
  label {
    cursor: pointer;
  }
`;

Container.displayName = "Container";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

ButtonContainer.displayName = "ButtonContainer";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  chooseFileMessage: string;
  uploadMessage: string;
  handleUpload: (file: File) => void;
  theme: string;
}

interface IState {
  selectedFile: File | null;
}

type DefaultProps = Pick<IProps, "chooseFileMessage" | "uploadMessage" | "theme">;

class FileInput extends React.PureComponent<IProps, IState> {
  static defaultProps: DefaultProps = {
    chooseFileMessage: "Choose file",
    uploadMessage: "Upload file",
    theme: "outline",
  };

  state: IState = { selectedFile: null };

  fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files ? event.target.files[0] : null;
    this.setState({ selectedFile: file });
  };

  resetFile = (): void => this.setState({ selectedFile: null });

  handleUpload = (): void => {
    if (this.state.selectedFile !== null) this.props.handleUpload(this.state.selectedFile);
  };

  render(): JSX.Element {
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
              buttonType="primaryOutline"
              icon={this.state.selectedFile ? "upload" : "file"}
              id="uploadButton"
              type="button"
            >
              {this.state.selectedFile ? this.props.uploadMessage : this.props.chooseFileMessage}
            </Button>
          </label>
          {this.state.selectedFile && (
            <Button buttonType="ghost" icon="times" onClick={this.resetFile} type="button">
              {this.state.selectedFile.name}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default FileInput;
