import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ArrowIcon } from "../../../molecules/Panel"

export const Wrapper = styled.div`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 20px);

  button {
    position: absolute;
    top: 0.55rem;
    right: 0.55rem;
    background-color: transparent;
    transition: opacity 0.15s;
    opacity: 0;
    border: none;
    color: ${props => props.theme.action.main.hex};
    path {
      fill: ${props => props.theme.action.main.hex};
    }
  }
  :hover {
    cursor: default;

    button {
      opacity: 1;
      cursor: pointer;
      outline: none;
    }
  }
`

Wrapper.displayName = "Wrapper"

class SelectValueRenderer extends React.Component {
  renderValue = () => {
    const fullOption =
      this.props.colDef.cellEditorParams &&
      this.props.colDef.cellEditorParams.values &&
      this.props.colDef.cellEditorParams.values.find(option => option.value === this.props.value)

    return (fullOption ? fullOption.label : this.props.value) || " "
  }

  startEditingCell = () => {
    const {
      rowIndex,
      colDef: { field },
    } = this.props

    this.props.api.startEditingCell({ rowIndex, colKey: field })
  }

  render = () => {
    return (
      <Wrapper>
        {this.renderValue()}
        <button type="button" onClick={this.startEditingCell}>
          <ArrowIcon name="chevron-down" size="1x" flipped={false} />
        </button>
      </Wrapper>
    )
  }
}

SelectValueRenderer.displayName = "SelectValueRenderer"

SelectValueRenderer.propTypes = {
  colDef: PropTypes.shape({
    cellEditorParams: PropTypes.shape({
      values: PropTypes.array,
    }),
    field: PropTypes.string,
  }),
  rowIndex: PropTypes.number,
  api: PropTypes.shape({
    startEditingCell: PropTypes.func,
  }),
  value: PropTypes.string,
}

export default SelectValueRenderer
