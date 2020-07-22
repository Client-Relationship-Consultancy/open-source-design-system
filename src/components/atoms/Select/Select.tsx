import React from "react";
import styled, { withTheme } from "styled-components";
// Using react-select, read more here. https://github.com/JedWatson/react-select
import ReactSelect, { ValueType, OptionsType } from "react-select";
import { SizeMe } from "react-sizeme";
import { colourPalette } from "../../../brandColours";
import styles from "./SelectStyles";

interface IlabelStyle {
  autosizeBasedOnPlaceholder?: boolean;
  width?: number;
}

export const LabelStyle = styled.label<IlabelStyle>`
  width: ${(props): string => (props.width ? `${props.width}px` : "auto")};
  div[class$="placeholder"] {
    ${(props): string =>
      props.autosizeBasedOnPlaceholder
        ? `
    transform: none;
    position: relative;
    margin-right: calc(-100% + 8px);
    `
        : ""}
  }
`;

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
  onChange?: (value: IDropdownObject) => void;
  onChangeMulti?: (value: OptionsType<IDropdownObject>) => void;
  onBlur?: () => void;
  value?: IDropdownObject[] | null;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  defaultValue?: string;
  blacklistedOptions?: string[];
  className?: string;
  theme?: string;
  customSort?: (a: IDropdownObject, b: IDropdownObject) => number;
  autosizeBasedOnPlaceholder?: boolean;
}

interface IState {
  componentWidth?: number;
}

export class CustomSelect extends React.Component<ISelect, IState> {
  static displayName: string;

  static defaultProps: { [index: string]: any };

  state: IState = {
    componentWidth: undefined,
  };

  // Create function to convert given options object to the correct format (objects within an array)
  renderOptions = (optionsObject: IOption): IDropdownObject[] => {
    const options = Object.entries(optionsObject).map(([key, value]) => ({
      value: key,
      label: value,
    }));
    if (this.props.customSort) {
      options.sort(this.props.customSort);
    } else {
      options.sort((a, b) =>
        typeof a.label === "string" && typeof b.label === "string"
          ? a.label.localeCompare(b.label)
          : 0,
      );
    }
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

  onChange = (value: ValueType<IDropdownObject>): void => {
    if (value) {
      if (this.props.isMulti && this.props.onChangeMulti) {
        this.props.onChangeMulti(value as OptionsType<IDropdownObject>);
      } else if (this.props.onChange) {
        this.props.onChange(value as IDropdownObject);
      }
    }
  };

  setWidth = (width: number | null) => {
    if (width && width > 0 && !this.state.componentWidth) {
      this.setState({ componentWidth: width });
    }
  };

  render() {
    const {
      title,
      id,
      name,
      placeholder,
      options,
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
      <LabelStyle
        autosizeBasedOnPlaceholder={this.props.autosizeBasedOnPlaceholder}
        id={id}
        htmlFor={selectId}
        className={className}
        width={this.state.componentWidth}
      >
        <SizeMe noPlaceholder>
          {({ size }) => {
            if (this.props.autosizeBasedOnPlaceholder) this.setWidth(size.width);
            return (
              <>
                <Title>{title}</Title>
                <ReactSelect
                  id={selectId}
                  styles={styles(this.props.theme)}
                  placeholder={placeholder}
                  name={name}
                  onBlur={onBlur}
                  value={filteredValue || value}
                  options={this.renderOptions(options)}
                  onChange={this.onChange}
                  isDisabled={isDisabled}
                  isClearable={isClearable}
                  isMulti={isMulti}
                  defaultValue={this.buildDefaultValue(defaultValue)}
                />
              </>
            );
          }}
        </SizeMe>
      </LabelStyle>
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
