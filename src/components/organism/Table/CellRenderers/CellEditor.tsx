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
  useInnerRef?: boolean;
}

export default class CellTextEditor extends React.Component<IProps> {
  componentRef = React.createRef<HTMLInputElement>();

  static defaultProps: Pick<IProps, "useInnerRef"> = {
    useInnerRef: false,
  };

  state = {
    value: this.props.value,
  };

  getValue() {
    return this.state.value;
  }

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  // innerRef is deprecated in Styled Components v4. Uses ref instead.
  // This is to allow backward compatibility for older Styled Components.
  createRefProp = () =>
    this.props.useInnerRef ? { innerRef: this.componentRef } : { ref: this.componentRef };

  afterGuiAttached() {
    const input = this.componentRef.current;
    if (input) {
      input.focus();
      input.select();
    }
  }

  render() {
    return (
      <CellEditor
        {...this.createRefProp()}
        maxLength={this.props.maxLength}
        value={this.getValue()}
        onChange={this.handleChange}
        type="text"
      />
    );
  }
}
