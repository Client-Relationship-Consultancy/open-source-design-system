import React from "react";
import { connect, FormikProps, FormikValues } from "formik";
import styled from "styled-components";
import TextToggle from "../../../atoms/TextToggle";

const Container = styled.div<{ row: boolean }>`
  align-items: center;
  display: flex;
  flex-flow: ${props => (props.row ? "row" : "column")};
  align-items: flex-start;
  > * + * {
    margin-left: ${props => (props.row ? "1rem" : "0")};
    margin-top: ${props => (props.row ? "0" : "0.5rem")};
  }
`;
interface CustomFormikTextToggleProps {
  name: string;
  customOnChange?: (name: string, value: boolean) => void;
  label?: JSX.Element | string;
  trueOption?: string;
  falseOption?: string;
  isDisabled?: boolean;
  id?: string;
  className?: string;
  row?: boolean;
}

export class CustomFormikTextToggle extends React.PureComponent<
  CustomFormikTextToggleProps & { formik: FormikProps<FormikValues> }
> {
  componentDidMount = () => {
    this.props.formik.setFieldTouched(this.props.name, true);
  };

  onChange = () => {
    const { customOnChange, formik, name } = this.props;
    formik.setFieldValue(name, !formik.values[name]);
    formik.setFieldTouched(name, true);
    if (customOnChange) customOnChange(name, !formik.values[name]);
  };

  render() {
    const {
      name,
      label,
      trueOption,
      falseOption,
      isDisabled,
      className,
      row = true,
      id,
      ...other
    } = this.props;
    const { values, handleBlur } = this.props.formik;
    const textToggleId = id ? `${id}-textToggle` : "";
    const containerClassName = className ? `FormikTextToggle ${className}` : "FormikTextToggle";
    return (
      <Container className={containerClassName} row={row}>
        <label id={id} htmlFor={textToggleId}>
          {label}
        </label>
        <TextToggle
          id={textToggleId}
          name={name}
          onChange={this.onChange}
          onBlur={handleBlur}
          trueOption={trueOption}
          falseOption={falseOption}
          isDisabled={isDisabled}
          checked={values && values[name]}
          {...other}
        />
      </Container>
    );
  }
}

const FormikTextToggle = connect<CustomFormikTextToggleProps, { [index: string]: string }>(
  CustomFormikTextToggle,
);
FormikTextToggle.displayName = "FormikTextToggle";

export default FormikTextToggle;
