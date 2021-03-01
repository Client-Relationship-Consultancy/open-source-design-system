import React from "react";
import styled, { keyframes } from "styled-components";


enum Align {"center", "right", "left"};
enum Position {"absolute", "fixed"};
enum Type {"error", "absolute"};

interface IToastContainerProps{
    align?: Align;
    top?: string;
    position?: Position;
    type?: Type;
    visible: boolean;
};

interface IToastProps extends IToastContainerProps{
    children: React.ReactChildren;
};

const slideUp = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-100px);
  }
`;

const ToastContainer = styled.div<IToastContainerProps>`
    align-content: "center";
    background: #FFF1F0;
    border: 1px solid #FFA39E;
    box-sizing: border-box;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    animation: ${slideUp} 1s;
    padding: 9px 16px;
    display: ${props => props.visible? "block": "none"};
`;
// ToastContainer.defaultProps = {
//   theme: colourPalette.examplePalette,
// };
ToastContainer.displayName = "ToastContainer";

const Toast: React.FunctionComponent<IToastProps> = props => {
    const { children } = props;
    return (
      <ToastContainer {...props}>
          {children}
      </ToastContainer>
    );
  };

Toast.displayName = "Toast";

export default Toast;