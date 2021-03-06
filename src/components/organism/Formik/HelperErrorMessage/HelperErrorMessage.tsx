import React from "react";
import styled from "styled-components";
import { colourPalette } from "../../../../brandColours";

export const StyledErrorMessage = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.error.main.hex};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;
StyledErrorMessage.defaultProps = {
  theme: colourPalette.examplePalette,
};
StyledErrorMessage.displayName = "StyledErrorMessage";

export const StyledHelperCaption = styled.div`
  color: ${(props) => props.theme.black.tint80.hex};
  margin-top: 0.5rem;
  font-weight: 100;
  font-size: 0.875rem;
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
  isFocus: boolean;
}

export class HelperErrorMessage extends React.PureComponent<IProps> {
  render() {
    const { error, id, className, caption, isError, isFocus } = this.props;
    const errorClassName = className ? `ErrorMessage ${className}` : "ErrorMessage";
    return (
      <>
        {isError ? (
          <StyledErrorMessage id={id} className={errorClassName}>
            {error}
          </StyledErrorMessage>
        ) : (
          caption && isFocus && (
            <StyledHelperCaption id={id} className={errorClassName}>
              {caption}
            </StyledHelperCaption>
          )
        )}
      </>
    );
  }
}

export default HelperErrorMessage;
