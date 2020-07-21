import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import SelectArrowIcon from "../../../../assets/select-arrow-icon.svg"

export const Wrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 25px);
  :after {
    content: url("${SelectArrowIcon}");
    position: absolute;
    top: 0.55rem;
    right: 0.55rem;
    transition: opacity 0.15s;
    opacity: 0;
  }
  :hover, :focus {
    cursor: pointer;
    :after {
      opacity: 1;
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

    return fullOption ? fullOption.label : this.props.value
  }

  render = () => <Wrapper>{this.renderValue()}</Wrapper>
}

SelectValueRenderer.displayName = "SelectValueRenderer"

SelectValueRenderer.propTypes = {
  colDef: PropTypes.shape({
    cellEditorParams: PropTypes.shape({
      values: PropTypes.array,
    }),
  }),
  value: PropTypes.string,
}

export default SelectValueRenderer
