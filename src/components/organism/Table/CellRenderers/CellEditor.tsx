import React from "react";
import styled from "styled-components";

const Cell = styled.input``;

interface IProps {
  value: string;
  maxLength?: number;
}

export default class CellTextEditor extends React.Component<IProps> {
  state = {
    value: "",
  };

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  //   afterGuiAttached() {
  //     if (this.textInput) this.textInput.current!.focus();
  //   }

  getValue() {
    return this.state.value;
  }

  render() {
    console.log(this.props);
    return (
      <input
        maxLength={this.props.maxLength}
        value={this.props.value}
        // onChange={this.handleChange}
        type="text"
      />
    );
  }
}
