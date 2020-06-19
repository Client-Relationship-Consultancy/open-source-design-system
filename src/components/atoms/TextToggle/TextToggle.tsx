import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colourPalette } from "../../../brandColours"

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: ${props => props.width};
  height: 1.75rem;
  overflow: hidden;
  border-radius: 5px;
  opacity: ${props => (props.isDisabled ? "0.4" : "1")};
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
`

Label.displayName = "Label"

const Toggle = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  :checked + div {
    left: -100%;
  }
`
Toggle.displayName = "Toggle"

const SliderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  display: flex;
  transition: 0.3s ease-out;
`
SliderContainer.displayName = "SliderContainer"

const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.black.tint20.hex};
  color: ${props => props.theme.black.main.hex};
  font-size: 0.9rem;
`
Slider.defaultProps = {
  theme: colourPalette.examplePalette,
}
Slider.displayName = "Slider"

const CheckedSlider = styled(Slider)`
  color: ${props => props.theme.secondary.main.on};
  background-color: ${props => props.theme.secondary.main.hex};
`
CheckedSlider.defaultProps = {
  theme: colourPalette.examplePalette,
}
CheckedSlider.displayName = "CheckedSlider"

const TextToggle = props => {
  const {
    id,
    name,
    value,
    onChange,
    onBlur,
    trueOption,
    falseOption,
    width,
    isDisabled,
    theme,
    ...other
  } = props
  return (
    <Label width={width} isDisabled={isDisabled} className="TextToggle__Label">
      <Toggle
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        checked={value}
        id={id}
        disabled={isDisabled}
        {...other}
      />
      <SliderContainer>
        <Slider theme={theme}>{falseOption}</Slider>
        <CheckedSlider theme={theme}>{trueOption}</CheckedSlider>
      </SliderContainer>
    </Label>
  )
}
TextToggle.displayName = "TextToggle"

TextToggle.defaultProps = {
  trueOption: "True",
  falseOption: "False",
  width: "4.5rem",
  isDisabled: false,
}

TextToggle.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  trueOption: PropTypes.any,
  falseOption: PropTypes.any,
  width: PropTypes.string,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.object,
}

export default TextToggle
