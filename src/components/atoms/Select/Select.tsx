import React from "react";
import styled, { withTheme } from "styled-components";
// Using react-select, read more here. https://github.com/JedWatson/react-select
import ReactSelect, { ValueType } from "react-select";
import { colourPalette } from "../../../brandColours";
import styles from "./SelectStyles";

const Title = styled.div`
  margin-bottom: 0.25rem;
`;
Title.displayName = "Title";

interface IOption {
  [key: string]: string;
}

interface IDropdownObject {
  value: string;
  label: string;
}

interface ISelect {
  title?: string;
  id?: string;
  name?: string;
  placeholder?: React.ReactNode;
  options: IOption;
  onChange?: (value: ValueType<IDropdownObject>) => void;
  onBlur?: () => void;
  value?: IDropdownObject[] | null;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  defaultValue?: string;
  blacklistedOptions?: string[];
  className?: string;
  theme?: string;
}

class CustomSelect extends React.Component<ISelect> {
  static displayName: string;
  
  static defaultProps: { [index: string]: any };

  // Create function to convert given options object to the correct format (objects within an array)
  renderOptions = (optionsObject: IOption): IDropdownObject[] => {
    const options = Object.entries(optionsObject).map(([key, value]) => ({
      value: key,
      label: value,
    }));
    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  };

  buildDefaultValue = (defaultVal?: string | IDropdownObject): IDropdownObject => {
    if (typeof defaultVal === "string") {
      if (this.props.options[defaultVal] !== undefined) {
        return { label: this.props.options[defaultVal], value: defaultVal };
      }
      if (this.props.options === undefined || Object.entries(this.props.options).length === 0) {
        return { label: defaultVal, value: defaultVal };
      }
    }
    return defaultVal as IDropdownObject;
  };

  render() {
    const {
      title,
      id,
      name,
      placeholder,
      options,
      onChange,
      onBlur,
      value,
      isDisabled,
      isClearable,
      isMulti,
      defaultValue,
      blacklistedOptions,
      className,
    } = this.props;
    let filteredValue: IDropdownObject[] | undefined;
    if (isMulti && value && blacklistedOptions) {
      filteredValue = value.filter(v => !blacklistedOptions.includes(v.value));
    }
    const selectId = id ? `${id}-select` : "";
    return (
      <label id={id} htmlFor={selectId} className={className}>
        <Title>{title}</Title>
        <ReactSelect
          id={selectId}
          styles={styles(this.props.theme)}
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          value={filteredValue || value}
          options={this.renderOptions(options)}
          onChange={onChange}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isMulti={isMulti}
          defaultValue={this.buildDefaultValue(defaultValue)}
        />
      </label>
    );
  }
}

// Declare the display name for Storybook static
// Name should match the export name
CustomSelect.displayName = "CustomSelect";

// Declare the default props of CustomSelect
CustomSelect.defaultProps = {
  placeholder: "Type to search from the dropdown list...",
  blacklistedOptions: [],
  theme: colourPalette.examplePalette,
};

const Select = withTheme(CustomSelect);
Select.displayName = "Select";

export default Select;
