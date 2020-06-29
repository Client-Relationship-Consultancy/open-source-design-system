import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { FormikSelect } from "../../organism/Formik"
import Select from "../../atoms/Select"

import { colourPalette } from "../../../brandColours"
import { timezones } from "./timezones"

const TimezoneContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Key = styled.span`
  color: ${props => props.theme.primary.main.hex};
  margin-right: 0.25rem;
  font-weight: 600;
`

export const getKeyFromTimezone = timezone => {
  const [continent] = timezone.name.split("/")
  const { gmt_offset_january: gmt, dst_offset_july: dst } = timezone
  const GMT = `GMT${gmt >= 0 ? "+" : ""}${gmt}:00`
  const DST = `DST${dst >= 0 ? "+" : ""}${dst}:00`
  return `(${GMT}/${DST}) ${continent}`
}

export const getCountryForTimezone = timezone => {
  const [, country] = timezone.name.split("/")
  return country && country.split("_").join(" ")
}

export const getLabel = values => values.slice(0, 5).join(", ")

export const Timezone = props => (
  <TimezoneContainer>
    <Key theme={props.theme}>{props.timezoneKey}</Key>
    {`- ${getLabel(props.values)}`}
  </TimezoneContainer>
)

Timezone.defaultProps = {
  theme: colourPalette.examplePalette,
}

Timezone.propTypes = {
  timezoneKey: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  theme: PropTypes.object,
}

class TimezoneSelect extends React.Component {
  // Create function to convert given options object to the correct format (objects within an array)
  renderOptions = () => {
    const groupedTimezones = timezones.rows
      .map(timezone => ({
        key: getKeyFromTimezone(timezone),
        value: getCountryForTimezone(timezone),
      }))
      .reduce(
        (prev, { key, value }) => ({ ...prev, [key]: prev[key] ? [...prev[key], value] : [value] }),
        {},
      )

    return Object.entries(groupedTimezones)
      .map(([key, values]) => ({
        key: `${key} - ${getLabel(values)}`,
        value: <Timezone timezoneKey={key} values={values} />,
      }))
      .reduce((prev, curr) => ({ ...prev, [curr.key]: curr.value }), {})
  }

  render() {
    const {
      title,
      id,
      name,
      placeholder,
      onChange,
      onBlur,
      isClearable,
      className,
      useFormik,
    } = this.props

    const SelectComponent = useFormik ? FormikSelect : Select

    return (
      <SelectComponent
        id={id}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        custonSort={this.props.customSort}
        options={this.renderOptions()}
        onChange={onChange}
        isClearable={isClearable}
        title={title}
        className={className}
      />
    )
  }
}

TimezoneSelect.displayName = "TimezoneSelect"

TimezoneSelect.defaultProps = {
  placeholder: "Type to select a timezone...",
  isClearable: true,
  useFormik: true,
}

TimezoneSelect.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isClearable: PropTypes.bool,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  useFormik: PropTypes.bool,
  customSort: PropTypes.func,
}

export default TimezoneSelect
