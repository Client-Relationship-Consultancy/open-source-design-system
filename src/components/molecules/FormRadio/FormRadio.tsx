import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import Label from "../../atoms/Label"
import Radio from "../../atoms/Radio"

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: center;
  align-items: center;
  > input {
    ${props => (props.row ? "margin-right: 0.5rem" : "margin-bottom:0.5rem")}
  }
`
Container.displayName = "Container"

const FormRadio = props => {
  const { row, id, className, name, onChange, checked, required, label } = props

  return (
    <Container className={className} row={row}>
      <Radio id={id} name={name} onChange={onChange} checked={checked} required={required} />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  )
}

FormRadio.displayName = "FormRadio"

FormRadio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  row: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  required: PropTypes.bool,
}

export default FormRadio
