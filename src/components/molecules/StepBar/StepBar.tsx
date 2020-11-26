import React from "react";
import styled from "styled-components";
import Icon from "../../atoms/Icon/Icon";
import { colourPalette } from "../../../brandColours";

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;
StepWrapper.displayName = "StepWrapper";

const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid ${(props) => props.theme.secondary.main.hex};
  color: ${(props) => props.theme.secondary.main.hex};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: bold;
`;
StepNumber.defaultProps = {
  theme: colourPalette.examplePalette,
};
StepNumber.displayName = "StepNumber";

const StepName = styled.div`
  margin-left: 0.5rem;
  font-size: 1.1rem;
  &.active {
    color: ${(props) => props.theme.secondary.main.hex};
    font-weight: bold;
  }
`;
StepName.defaultProps = {
  theme: colourPalette.examplePalette,
};
StepName.displayName = "StepName";

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
StepsContainer.displayName = "StepsContainer";

const Line = styled.hr`
  flex: 1 1 auto;
  margin: 0 1rem;
  border: none;
  border-top: 2px solid ${(props) => props.theme.secondary.main.hex};
`;
Line.defaultProps = {
  theme: colourPalette.examplePalette,
};
Line.displayName = "Line";

interface IStep {
  order: number;
  name: string;
}

interface IStepBar {
  steps: IStep[];
  currentStep?: number;
  id?: string;
  className?: string;
}

class StepBar extends React.PureComponent<IStepBar> {
  renderTotalSteps = (stepNames: IStep[], currentStep: number): React.ReactNode[] =>
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
    ));

  render() {
    const { steps, currentStep, id, className } = this.props;
    return (
      <StepsContainer id={id} className={className}>
        {this.renderTotalSteps(steps, currentStep || 1)}
      </StepsContainer>
    );
  }
}

export default StepBar;
