import React from "react"
import styled from "styled-components"

import Label from "../../atoms/Label"
import Radio from "../../atoms/Radio"

interface IRadioContainer {
  row: boolean;
}

const Container = styled.div<IRadioContainer>`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: center;
  align-items: center;
  > input {
    ${(props) => (props.row ? "margin-right: 0.5rem" : "margin-bottom:0.5rem")}
  }
`
Container.displayName = "Container"


export interface IRadioProps{
  row: boolean;
  id: string;
  className: string;
  name: string;
  onChange: () => void;
  checked: boolean;
  required: boolean;
  label: string;
};

const FormRadio = (props: IRadioProps) => {
  const { row, id, className, name, onChange, checked, required, label } = props
  return (
    <Container className={className} row={row}>
      <Radio id={id} name={name} onChange={onChange} checked={checked} required={required} />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  )
}

FormRadio.displayName = "FormRadio"

export default FormRadio
