import React from "react"
import { connect, getIn } from "formik"
import PropTypes from "prop-types"
import Select from "../../../atoms/Select"
import HelperErrorMessage from "../HelperErrorMessage"

export class CustomSelect extends React.PureComponent {
  state = {
    focus: false,
  }

  onChange = (value) => {
    let newValue = value
    this.props.onChange(this.props.name, newValue)
    if (newValue === null) {
      newValue = ""
    }
    this.props.formik.setFieldValue(this.props.name, newValue)
  }

  onBlur = () => {
    this.setState({ focus: false })
  }

  onFocus = () => {
    this.setState({ focus: true })
  }

  getValue = () => {
    const { name } = this.props
    const { values } = this.props.formik
    return typeof values[name] === "string"
      ? { value: values[name], label: this.props.options[values[name]] }
      : values[name]
  }

  render() {
    const { name, id, caption } = this.props
    const { errors, touched } = this.props.formik
    const error = getIn(errors, name)
    const touch = getIn(touched, name)
    return (
      <div>
        <Select
          {...this.props}
          id={id}
          onChange={this.onChange}
          onChangeMulti={this.onChange}
          value={this.getValue()}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <HelperErrorMessage
          error={error}
          caption={caption}
          isError={error && touch}
          isFocus={this.state.focus}
        />
      </div>
    )
  }
}
CustomSelect.displayName = "CustomSelect"

CustomSelect.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  caption: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  blacklistedOptions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
}

const FormikSelect = connect(CustomSelect)
FormikSelect.displayName = "FormikSelect"

export default FormikSelect
