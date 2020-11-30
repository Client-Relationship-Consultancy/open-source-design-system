import React from "react";
import styled from "styled-components";

const CellEditor = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  padding-left: 4px;
  border: none;

  :focus {
    font-size: 12px;
    outline: none;
    border-color: #719ece;
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
  }
`;

CellEditor.displayName = "CellEditor";

interface IProps {
  value: string;
  maxLength?: number;
}

export default class CellTextEditor extends React.Component<IProps> {
  componentRef = React.createRef<HTMLInputElement>();

  state = {
    value: this.props.value,
  };

  getValue() {
    return this.state.value;
  }

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  afterGuiAttached() {
    const input = this.componentRef.current;
    if (input) {
      input.focus();
      input.select();
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="ag-cell-edit-wrapper">
        <CellEditor
          ref={this.componentRef}
          maxLength={this.props.maxLength}
          value={this.getValue()}
          onChange={this.handleChange}
          type="text"
        />
      </div>
    );
  }
}
