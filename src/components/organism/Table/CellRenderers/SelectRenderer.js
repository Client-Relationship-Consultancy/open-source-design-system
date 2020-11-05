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
    // this is needed due to a bug of react-select that doesn't consider menuPlacement before is fully rendered
    // here is the issue https://github.com/JedWatson/react-select/issues/3421
    // the issue is closed and claims to be resolved with newer version but ElioS tryed to update it and still experienced the problem
    setTimeout(() => {
      this.setState({ menuOpen: true })
    }, 1)
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

  calculateDirection = () => {
    // get the distance from the top of the body without considering scroll
    const distanceFromTop = this.props.node.rowTop
    // get the body html element
    const tableBodyElement = this.props.agGridReact.eGridDiv.querySelector(".ag-body-viewport")
    // get the ammount scrolled inside the table
    const scrolledDistanceFromTop = tableBodyElement.scrollTop
    // get the height of the table without considering the content
    const tableBodyHeight = tableBodyElement.getBoundingClientRect().height
    // calculate the distance of the row from the top of the table considering the scroll
    const RelativeDistance = distanceFromTop - scrolledDistanceFromTop
    // check if the row is closer to the bottom
    const isRowNearBottom = RelativeDistance > tableBodyHeight / 2
    return isRowNearBottom ? "top" : "bottom"
  }

  render() {
    return (
      <Select
        direction={this.calculateDirection()}
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
}

SelectRenderer.displayName = "SelectRenderer"
Select.displayName = "Select"
