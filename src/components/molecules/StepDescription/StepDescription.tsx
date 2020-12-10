import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { colourPalette } from "../../../brandColours"

const StepWrapper = styled.div`
  display: flex;
  align-items: ${props => props.stepTopFlexAlignment || "flex-start"};
  margin: 0.5rem 0;
  flex: 1 1 0;
`
StepWrapper.displayName = "StepWrapper"

const StepNumber = styled.div`
  width: 2.5rem;
  min-width: 2.5rem;
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
  font-size: 1rem;
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
  flex-wrap: nowrap;
  justify-content: space-evenly;

  > * + * {
    margin-left: 1rem;
  }
`
StepsContainer.displayName = "StepsContainer"

class StepDescription extends React.PureComponent {
  renderTotalSteps = stepNames => {
    const { stepTopFlexAlignment } = this.props
    return stepNames.map(step => (
      <React.Fragment key={step.order}>
        <StepWrapper stepTopFlexAlignment={stepTopFlexAlignment}>
          <StepNumber>{step.order}</StepNumber>
          <StepName>{step.text}</StepName>
        </StepWrapper>
      </React.Fragment>
    ))
  }

  render() {
    const { steps, id, className } = this.props
    return (
      <StepsContainer id={id} className={className}>
        {this.renderTotalSteps(steps)}
      </StepsContainer>
    )
  }
}

StepDescription.displayName = "StepDescription"
StepDescription.propTypes = {
  steps: PropTypes.array,
  stepTopFlexAlignment: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
}

export default StepDescription
