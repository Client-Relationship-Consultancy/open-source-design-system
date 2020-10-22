import React from "react";
import styled from "styled-components";

import Label from "../../atoms/Label";
import Input, { IInputProps } from "../../atoms/Input";

const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
`;

Container.displayName = "Container";

interface IFormInputProps extends Omit<IInputProps, "color" | "required" | "onFocus"> {
  label?: string;
}

const FormInput: React.FC<IFormInputProps> = (props) => {
  const {
    className,
    type,
    onChange,
    placeholder,
    id,
    name,
    value,
    label,
    disabled,
    icon,
    bgColor,
    border,
  } = props;
  return (
    <Container className={className}>
      <Input
        name={name}
        value={value}
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        bgColor={bgColor}
        border={border}
        icon={icon}
      />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
};

FormInput.displayName = "FormInput";

export default FormInput;
