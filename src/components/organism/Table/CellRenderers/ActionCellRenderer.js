import React from "react"
import PropTypes from "prop-types"

import Button from "../../../atoms/Button"

export default class ActionCellRenderer extends React.Component {
  render() {
    const {
      onClick,
      label,
      buttonType = "danger",
      buttonSize = "small",
      disabled = false,
    } = this.props.actionCellRendererParams
    return (
      <Button
        buttonSize={buttonSize}
        onClick={() => onClick(this.props.data)}
        // disabled if either the cell or table is disabled
        disabled={!(!disabled && !this.props.isDisabled)}
        buttonType={buttonType}
        theme={this.props.theme}
      >
        {label}
      </Button>
    )
  }
}

ActionCellRenderer.displayName = "ActionCellRenderer"

ActionCellRenderer.propTypes = {
  actionCellRendererParams: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
    buttonSize: PropTypes.string,
    buttonType: PropTypes.string,
    disabled: PropTypes.bool,
  }).isRequired,
  isDisabled: PropTypes.bool,
  theme: PropTypes.object,
  data: PropTypes.object,
}
