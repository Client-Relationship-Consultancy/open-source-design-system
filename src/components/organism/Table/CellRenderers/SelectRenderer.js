import React from "react"
import PropTypes from "prop-types"

// Using react-select, read more here. https://github.com/JedWatson/react-select
import ReactSelect from "react-select"
import styles from "../../../atoms/Select/SelectStyles"

export class Select extends React.PureComponent {
  renderOptions = () =>
    this.props.values.map(value => {
      return typeof value === "string"
        ? {
            value,
            label: value,
          }
        : value
    })

  renderValue = () => {
    if (!this.props.value) return null

    return this.renderOptions().find(option => option.value && option.value === this.props.value)
  }

  menuPlacement = () => {
    return this.props.fromTop > 250 ? "top" : "bottom"
  }

  render = () => (
    <ReactSelect
      id="SelectEditor"
      styles={styles(this.props.theme)}
      menuPlacement={this.menuPlacement()}
      value={this.renderValue()}
      options={this.renderOptions()}
      onChange={this.props.onChange}
      isDisabled={this.props.isDisabled}
      isClearable={this.props.isClearable}
      isMulti={false}
      menuIsOpen
    />
  )
}

export default class SelectRenderer extends React.Component {
  state = {
    value: this.props.value,
  }

  handleChange = selectedOption => {
    this.setState({ value: selectedOption ? selectedOption.value : selectedOption }, () =>
      this.props.api.stopEditing(false),
    )
  }

  getValue = () => this.state.value

  render() {
    return (
      <Select
        fromTop={this.props.node.rowTop}
        value={this.state.value}
        values={this.props.values}
        isDisabled={this.props.isDisabled}
        onChange={this.handleChange}
        theme={this.props.theme}
        isClearable={this.props.isClearable}
      />
    )
  }
}

SelectRenderer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  values: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  theme: PropTypes.object,
  node: PropTypes.shape({
    rowTop: PropTypes.number,
  }),
}

Select.propTypes = {
  ...SelectRenderer.propTypes,
  values: PropTypes.array.isRequired,
  fromTop: PropTypes.number,
}

SelectRenderer.displayName = "SelectRenderer"
Select.displayName = "Select"
