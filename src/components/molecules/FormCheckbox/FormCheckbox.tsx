import React from "react";
import styled from "styled-components";

import Label from "../../atoms/Label";
import Checkbox from "../../atoms/Checkbox";

interface IContainerProps {
  disabled?: boolean;
}

const Container = styled.div<IContainerProps>`
  display: inline-block;
  ${(props) => (props.disabled ? "opacity: 0.3;" : "")}
  > div {
    display: flex;
    align-items: center;
    > * + * {
      margin-left: 0.5rem;
    }
    input,
    label {
      ${(props) => (props.disabled ? "cursor:not-allowed !important;" : "")}
    }
  }
`;

Container.displayName = "Container";

type IFormCheckboxProps = React.HTMLProps<HTMLInputElement>;

const FormCheckbox: React.FC<IFormCheckboxProps> = (props) => {
  const { id, className, label, name, onChange, value, checked, disabled } = props;

  return (
    <Container disabled={disabled}>
      <div>
        <Checkbox
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          checked={checked}
          disabled={disabled}
        />
        <Label className={className} htmlFor={id}>
          {label}
        </Label>
      </div>
    </Container>
  );
};

FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;
