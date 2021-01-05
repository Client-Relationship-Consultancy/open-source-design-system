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

type Timezone = {
  id: number;
  name: string;
  gmt_offset_january: number;
  dst_offset_july: number;
  type: string;
}

export const getKeyFromTimezone = (timezone: Timezone)  => {
  const [continent] = timezone.name.split("/")
  const { gmt_offset_january: gmt, dst_offset_july: dst } = timezone
  const GMT = `GMT${gmt >= 0 ? "+" : ""}${gmt}:00`
  const DST = `DST${dst >= 0 ? "+" : ""}${dst}:00`
  return `(${GMT}/${DST}) ${continent}`
}

export const getCountryForTimezone = (timezone: Timezone)  => {
  const [, country] = timezone.name.split("/")
  return country && country.split("_").join(" ")
}

export const getLabel = (values: string[]) => values.slice(0, 5).join(", ")

interface ITimezoneProps {
  theme: any;
  timezoneKey: string;
  values: string[];
}

export const Timezone = (props: ITimezoneProps) => (
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
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
}

interface IDropdownObject {
  value: string;
  label: string;
}

interface IProps{
  id: string;
  title: string;
  name: string;
  placeholder: string;
  onChange: () => void;
  isClearable: boolean;
  onBlur: () => void;
  className: string;
  useFormik: boolean;
  customSort: (a: IDropdownObject, b: IDropdownObject) => number;
}

interface ITimezoneProps {
  theme: any;
  timezoneKey: string;
  values: string[];
}

class TimezoneSelect extends React.Component <IProps>{
static defaultProps= {
  placeholder: "Type to select a timezone...",
  isClearable: true,
  useFormik: true,
}

  // Create function to convert given options object to the correct format (objects within an array)
  renderOptions = () => {
    const groupedTimezones = timezones.rows
      .map(timezone => ({
        key: getKeyFromTimezone(timezone),
        value: getCountryForTimezone(timezone),
      }))
      .reduce(
        (prev: any, { key, value }) => ({ ...prev, [key]: prev[key] ? [...prev[key], value] : [value] }),
        {},
      )

    return Object.entries(groupedTimezones)
      .map(([key, values]: any) => ({
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
        customSort={this.props.customSort}
        options={this.renderOptions()}
        onChange={onChange}
        isClearable={isClearable}
        title={title}
        className={className}
      />
    )
  }
}

export default TimezoneSelect
