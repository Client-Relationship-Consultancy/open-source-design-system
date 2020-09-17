import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import SelectArrowIcon from "../../../../assets/select-arrow-icon.svg"

export const Wrapper = styled.div`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 20px);
  
  button {
    /* background-image: ${SelectArrowIcon}; */
    background-color: red;
    transition: opacity 0.15s;
    opacity: 0;
  }
  :hover,
  :focus {
    cursor: default;
    
    button {
      opacity: 1;
      cursor: pointer;
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
          Button
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
