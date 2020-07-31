import React from "react";
import styled from "styled-components";
import Icon from "../../../atoms/Icon";

interface IIconWrapper {
  size?: string;
}

export const IconWrapper = styled.div<IIconWrapper>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props): string => props.size || "1.5rem"};
`;
IconWrapper.displayName = "IconWrapper";

export interface IProps {
  value: boolean;
  size?: string;
}

const CheckRenderer: React.FC<IProps> = ({ value, size }: IProps) => {
  if (typeof value === "boolean") {
    return (
      <IconWrapper size={size}>
        {value === true ? (
          <Icon name="check" color="primary" />
        ) : (
          <Icon name="times" color="error" />
        )}
      </IconWrapper>
    );
  }
  return null;
};

export default CheckRenderer;
