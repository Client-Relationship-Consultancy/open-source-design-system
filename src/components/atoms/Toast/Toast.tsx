import React from "react";
import styled, { keyframes } from "styled-components";

enum Align {
  "center",
  "right",
  "left",
}
enum Position {
  "absolute",
  "fixed",
}
enum Type {
  "error",
  "success",
}

interface IToastContainerProps {
  align?: Align;
  top?: string;
  position?: Position;
  type?: Type;
  visible: boolean;
}

interface IToastProps extends IToastContainerProps {
  children: React.ReactChildren;
}

const slideDown = keyframes`
  from {
    top:-100px;
    opacity:0;
  }
  to {
    opacity:1;
  }
`;
const slideUp = keyframes`
  from {
    opacity:1;
  }
  to {
    top:-100px;
    opacity:0;
  }
`;

export const ToastContainer = styled.div<IToastContainerProps>`
  align-content: "center";
  background: #fff1f0;
  border: 0.0625rem solid #ffa39e;
  box-sizing: border-box;
  border-radius: 0.25rem;
  position: ${(props: IToastContainerProps) => props.position || "absolute"};
  display: block;
  max-width: 100%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.375rem;
  top: ${(props: IToastContainerProps) => props.top || "0.625rem"};
  animation: ${(props: IToastContainerProps) => (props.visible ? slideDown : slideUp)} 0.3s forwards;
  padding: 0.5625rem 1rem;
  visibility: ${(props: IToastContainerProps) => (props.visible ? "visible" : "hidden")};
  transition: visibility 0.3s linear;
`;

ToastContainer.displayName = "ToastContainer";

const Toast: React.FunctionComponent<IToastProps> = (props) => {
  const { children } = props;
  return <ToastContainer {...props}>{children}</ToastContainer>;
};

Toast.displayName = "Toast";

export default Toast;
