import React from "react"
import PropTypes from "prop-types"

// Using react-select, read more here. https://github.com/JedWatson/react-select
import ReactSelect from "react-select"
import styles from "../../../atoms/Select/SelectStyles"

export class Select extends React.PureComponent {
  state = {
    menuOpen: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ menuOpen: true })
    }, 10)
  }

  renderOptions = () =>
    this.props.values.map((value) => {
      return typeof value === "string"
        ? {
            value,
            label: value,
          }
        : value
    })

  renderValue = () => {
    if (!this.props.value) return null

    return this.renderOptions().find((option) => option.value && option.value === this.props.value)
  }

  menuPlacement = () => {
    return this.props.fromTop > 250 ? "top" : "bottom" // 250 because the table is 500 tall
  }

  render = () => {
    return (
      <ReactSelect
        id="SelectEditor"
        styles={styles(this.props.theme)}
        menuPlacement={this.props.direction}
        value={this.renderValue()}
        options={this.renderOptions()}
        onChange={this.props.onChange}
        isDisabled={false}
        isClearable={this.props.isClearable}
        isMulti={false}
        onBlur={() => {
          this.setState({ menuOpen: false })
        }}
        menuIsOpen={this.state.menuOpen}
      />
    )
  }
}

export default class SelectRenderer extends React.Component {
  state = {
    value: this.props.value,
  }

  handleChange = (selectedOption) => {
    this.setState({ value: selectedOption ? selectedOption.value : selectedOption }, () =>
      this.props.api.stopEditing(false),
    )
  }

  getValue = () => this.state.value

  render() {
    const direction =
      this.props.node.rowTop -
        this.props.agGridReact.eGridDiv.querySelector(".ag-body-viewport").scrollTop >
      this.props.agGridReact.eGridDiv.querySelector(".ag-body-viewport").getBoundingClientRect()
        .height /
        2
        ? "top"
        : "bottom"

    return (
      <Select
        rowNode-={this.props.node}
        direction={direction}
        rowHeight={this.props.rowHeight}
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
