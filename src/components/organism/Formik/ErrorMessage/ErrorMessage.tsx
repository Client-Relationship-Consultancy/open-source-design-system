import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../../brandColours";

export const StyledErrorMessage = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.error.main.hex};
  margin-top: 0.5rem;
`;
StyledErrorMessage.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledErrorMessage.displayName = "StyledErrorMessage";

export const StyledHelperCaption = styled.div`
  color: ${(props) => props.theme.secondary.main.hex};
  margin-top: 0.5rem;
`;
StyledHelperCaption.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledHelperCaption.displayName = "StyledHelperCaption";

interface IProps {
  error: string;
  id?: string;
  className: string;
  caption?: string;
  isError: boolean;
}

export class ErrorMessage extends React.PureComponent<IProps> {
  render() {
    const { error, id, className, caption, isError } = this.props;
    const errorClassName = className ? `ErrorMessage ${className}` : "ErrorMessage";
    return (
      <>
        {isError ? (
          <StyledErrorMessage id={id} className={errorClassName}>
            {error}
          </StyledErrorMessage>
        ) : (
          caption && (
            <StyledHelperCaption id={id} className={errorClassName}>
              {caption}
            </StyledHelperCaption>
          )
        )}
      </>
    );
  }
}

export default ErrorMessage;
