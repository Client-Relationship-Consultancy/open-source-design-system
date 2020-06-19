import { IconProp, library, SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faCheck,
  faCommentDots,
  faEdit,
  faEnvelope,
  faEnvelopeOpen,
  faEye,
  faEyeSlash,
  faFile,
  faLink,
  faLock,
  faLockOpen,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPlusCircle,
  faSave,
  faSearch,
  faTimes,
  faUnlink,
  faUpload,
  faUserCircle,
  faUsers,
  faGraduationCap,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// See list here: https://origin.fontawesome.com/icons?d=gallery&s=solid&m=free
import React from "react";
import styled, { withTheme } from "styled-components";
import { colourPalette, IColourPalette } from "../../../brandColours";

library.add(faCheck);
library.add(faTimes);
library.add(faBars);
library.add(faLongArrowAltDown);
library.add(faLongArrowAltUp);
library.add(faUserCircle);
library.add(faLink);
library.add(faUnlink);
library.add(faAngleRight);
library.add(faAngleLeft);
library.add(faSave);
library.add(faPlusCircle);
library.add(faUpload);
library.add(faFile);
library.add(faLock);
library.add(faLockOpen);
library.add(faEye);
library.add(faEyeSlash);
library.add(faUsers);
library.add(faEnvelope);
library.add(faEnvelopeOpen);
library.add(faEdit);
library.add(faSearch);
library.add(faCommentDots);
library.add(faGraduationCap);
library.add(faChevronDown);

interface IIconContainer {
  rotateDegrees?: string;
  isVisible?: boolean;
}

const IconContainer = styled.div<IIconContainer>`
  ${props => props.rotateDegrees && `transform: rotate(${props.rotateDegrees}deg);`}
  ${props => !props.isVisible && "display: none;"}
`;
IconContainer.displayName = "IconContainer";

interface IStyledFontAwesomeIcon {
  color: string;
  shade: string;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<IStyledFontAwesomeIcon>`
  color: ${({color, theme, shade}) => color && theme[color].hex ? theme[color].hex : theme[color][shade].hex};
  ${props => props.onClick && "cursor: pointer;"}
`;
StyledFontAwesomeIcon.displayName = "StyledFontAwesomeIcon";

export interface IIconWithTheme {
  name: IconProp;
  color?: string;
  shade?: string;
  rotateDegrees?: string;
  isVisible?: boolean;
  onClick?: () => void;
  size?: SizeProp;
  theme?: IColourPalette;
  id?: string;
  className?: string;
}

const IconWithTheme: React.SFC<IIconWithTheme> = ({
  name,
  color = "black",
  onClick,
  size,
  rotateDegrees,
  isVisible,
  shade = "main",
  theme,
  id,
  className,
}) => (
  <IconContainer rotateDegrees={rotateDegrees} isVisible={isVisible} id={id} className={className}>
    <StyledFontAwesomeIcon
      icon={name}
      color={color}
      shade={shade}
      onClick={onClick}
      theme={theme}
      size={size}
    />
  </IconContainer>
);

IconWithTheme.defaultProps = {
  color: "black",
  shade: "main",
  size: "sm",
  isVisible: true,
  theme: colourPalette.examplePalette,
};
IconWithTheme.displayName = "IconWithTheme";

const Icon = withTheme(IconWithTheme);
Icon.displayName = "Icon";

export default Icon;
