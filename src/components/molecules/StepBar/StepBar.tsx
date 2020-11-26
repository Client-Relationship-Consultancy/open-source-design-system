import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Icon from "../../atoms/Icon/Icon"
import { colourPalette } from "../../../brandColours"

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`
StepWrapper.displayName = "StepWrapper"

const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid ${props => props.theme.secondary.main.hex};
  color: ${props => props.theme.secondary.main.hex};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: bold;
`
StepNumber.defaultProps = {
  theme: colourPalette.examplePalette,
}
StepNumber.displayName = "StepNumber"

const StepName = styled.div`
  margin-left: 0.5rem;
  font-size: 1.1rem;
  &.active {
    color: ${props => props.theme.secondary.main.hex};
    font-weight: bold;
  }
`
StepName.defaultProps = {
  theme: colourPalette.examplePalette,
}
StepName.displayName = "StepName"

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
StepsContainer.displayName = "StepsContainer"

const Line = styled.hr`
  flex: 1 1 auto;
  margin: 0 1rem;
  border: none;
  border-top: 2px solid ${props => props.theme.secondary.main.hex};
`
Line.defaultProps = {
  theme: colourPalette.examplePalette,
}
Line.displayName = "Line"

class StepBar extends React.PureComponent {
  renderTotalSteps = (stepNames, currentStep) =>
    stepNames.map((step, index) => (
      <React.Fragment key={step.order}>
        <StepWrapper className="StepBar__StepWrapper">
          <StepNumber>
            {index < currentStep - 1 ? <Icon name="check" color="secondary" /> : step.order}
          </StepNumber>
          <StepName className={index === currentStep - 1 ? "active" : ""}>{step.name}</StepName>
        </StepWrapper>
        {index < stepNames.length - 1 ? <Line /> : null}
      </React.Fragment>
    ))

  render() {
    const { steps, currentStep, id, className } = this.props
    return (
      <StepsContainer id={id} className={className}>
        {this.renderTotalSteps(steps, currentStep)}
      </StepsContainer>
    )
  }
}

StepBar.displayName = "StepBar"
StepBar.propTypes = {
  steps: PropTypes.array,
  currentStep: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
}
StepBar.defaultProps = {
  currentStep: 1,
}

export default StepBar
