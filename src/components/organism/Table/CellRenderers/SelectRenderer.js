import React from "react"
import PropTypes from "prop-types"

// Using react-select, read more here. https://github.com/JedWatson/react-select
import ReactSelect from "react-select"
import styles from "../../../atoms/Select/SelectStyles"

export class Select extends React.PureComponent {
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
    //getDisplayedRowCount()
    //getLastDisplayedRow()
    //calc diff from current row to lastdisplayed row index
    //if diff is >= 50% of row count, be bottom, if closer be top

    //can i use scrollTop?

    return this.props.fromTop > 250 ? "top" : "bottom" // 250 because the table is 500 tall
  }

  render = () => {
    console.log(`rowHeight: ${this.props.rowHeight}px`) //undefined but its 40px according to fromTop steps
    console.log(`fromTop: ${this.props.fromTop}px`)
    console.log(this.menuPlacement())
    console.log(this.props)

    // menuPlacement doesn't do anything

    // staging dropdowns are ALL down all the time

    // possible variables to investigate: max-height of menu, rowHeight and if that impact anything

    /*
      REPRO
      Survey name: blah blah 12.4

      First time opening a select editor -> menuPlacement doesn't do anything at all
      Second time opening the editor WITHOUT losing focus of the select, it will open correctly
      If you click outside of the menu to close it (and are not clicking the select itself) you will lose focus
      When you lose focus you reset the behaviour
    */

    /* 
      OK, so i can repro on storybook when using this.menuPlacement()
      Anything after the 240px mark is opening upward
      But only after 2nd attempt
      Focusing menuPlacement to be "top" = upward menu every time BUT only on the second opening



      So there are two issues:
      - calculation for when to use 'top' is wrong. It needs to account for how far table has scrolled, not just be based off fromTop
        - i.e. what's the current viewport into the table, calc based off that
        - or measure from bottom of table, if that distance is smaller than max-height of menu, make it top, else bottom
      - the menuPlacement prop is only being used on the second opening of the menu
        - not just limited to when the button is click, but also on double click to open (single click edit has same problem)
    */

    // if fromTop + rowHeight + menuHeight >

    return (
      <ReactSelect
        id="SelectEditor"
        styles={styles(this.props.theme)}
        maxMenuHeight={50}
        // menuPlacement={this.menuPlacement()} // top or bottom depending on the fromTop value from ag grid row node
        menuPlacement="auto"
        value={this.renderValue()}
        options={this.renderOptions()}
        onChange={this.props.onChange}
        isDisabled={false}
        isClearable={this.props.isClearable}
        isMulti={false}
        defaultMenuIsOpen
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
    return (
      <Select
        rowNode-={this.props.node}
        fromTop={this.props.node.rowTop}
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
