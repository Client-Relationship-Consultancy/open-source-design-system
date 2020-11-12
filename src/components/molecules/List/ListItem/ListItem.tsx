import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { colourPalette } from "../../../../brandColours"

interface IStyledListItem {
  padding?: boolean;
}

const StyledListItem = styled.li<IStyledListItem>`
  padding: ${props => (props.padding ? "0.5rem 1rem" : "0")};
  border-bottom: 1px ${props => props.theme.black.tint20.hex} solid;
`
StyledListItem.defaultProps = {
  theme: colourPalette.examplePalette,
}
StyledListItem.displayName = "StyledListItem"

type IListItem = React.HTMLProps<HTMLInputElement> & IStyledListItem

export const ListItem: React.FC<IListItem> = (props) => {
  const { children, padding, id, className } = props
  const styledListItemClassName = className
    ? `ListItem__StyledListItem- ${className}`
    : "ListItem__StyledListItem-"
  return (
    <StyledListItem padding={padding} id={id} className={styledListItemClassName}>
      {children}
    </StyledListItem>
  )
}
ListItem.displayName = "ListItem"
ListItem.defaultProps = {
  padding: true,
}

export default ListItem
