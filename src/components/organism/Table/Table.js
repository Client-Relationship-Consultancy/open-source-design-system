import { AgGridReact } from "ag-grid-react"
import React from "react"
import styled, { withTheme } from "styled-components"
import PropTypes from "prop-types"
import { colourPalette } from "../../../brandColours"

import CellRenderers from "./CellRenderers"
import HeaderComponents from "./HeaderComponents"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham.css"

export const Container = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  .ag-popup {
    height: 0 !important;
    min-height: 0 !important;
  }
  .ag-cell {
    overflow: visible;
    display: flex;
    align-items: center;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .SelectValueCell {
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
      button {
        position: absolute;
        top: 0.7rem;
        right: 0.45rem;
        background-color: transparent;
        transition: opacity 0.15s;
        opacity: 0;
        border: none;
        color: ${(props) => props.theme.secondary.main.hex};
        path {
          fill: ${(props) => props.theme.secondary.main.hex};
        }
      }
    }
    :hover {
      cursor: default;
      button {
        opacity: 1;
        cursor: pointer;
        outline: none;
      }
    }
    .ag-react-container {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      #SelectEditor {
        flex-grow: 1;
      }
    }
    :focus {
      button {
        opacity: 1;
        cursor: pointer;
        outline: none;
      }
    }
  }
  .ag-cell-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    /*
    Limit cell value size when cell has a drag or select row checkbox,
    otherwise overflow will not kick in and text will overflow to next cell
    */
    .ag-cell-value {
      width: 80%;
    }
  }
  &.ag-theme-balham .ag-cell-inline-editing {
    height: 100%;
  }
  &.ag-disabled {
    background: ${(props) => props.theme.black.tint20.hex};
  }
  .ag-sort-order {
    display: none;
  }
`

AgGridReact.prototype.areEquivalent = (a, b) => a === b

export const frameworkComponents = {
  actionCellRenderer: CellRenderers.ActionCellRenderer,
  customTextEditor: CellRenderers.CustomTextEditor,
  checkboxRenderer: CellRenderers.CheckboxRenderer,
  checkRenderer: CellRenderers.CheckRenderer,
  selectRenderer: CellRenderers.SelectRenderer,
  timezoneRenderer: CellRenderers.TimezoneRenderer,
  toggleRenderer: CellRenderers.ToggleRenderer,
  tooltipHeader: HeaderComponents.TooltipHeader,
}
export const components = {
  defaultTextEditor: CellRenderers.DefaultTextEditor,
  selectValueRenderer: CellRenderers.SelectValueRenderer,
}

export const gridOptions = {
  getRowStyle: (params) => ({ background: params.data.highlighted }),
}

export class TableWithTheme extends React.PureComponent {
  renderColumns = () => {
    const { columns, isDisabled, theme } = this.props
    return columns.map((column) => {
      const cellRenderer = !column.cellRendererSelector &&
        !column.cellRendererFramework && {
          cellRenderer: column.cellRenderer || "defaultTextEditor",
        }
      return {
        sortable: true,
        filter: true,
        ...column,
        ...cellRenderer,
        // only editable if it's not a custom cellRenderer and if the table is not disabled
        editable: (params) => {
          if (isDisabled) {
            return false
          }
          if (column.editable !== undefined) {
            return typeof column.editable === "boolean" ? column.editable : column.editable(params)
          }
          return !!(!column.cellRenderer && !column.cellRendererSelector && !isDisabled)
        },
        cellRendererParams: {
          ...column.cellRendererParams,
          isDisabled,
          theme,
        },
        cellEditorParams: {
          ...column.cellEditorParams,
          isDisabled,
          theme,
        },
      }
    })
  }

  getRowStyle = (params) => {
    if (this.props.isDisabled) {
      return {
        background: this.props.theme.black.tint20.hex,
        borderColor: this.props.theme.black.tint20.hex,
        color: this.props.theme.black.tint80.hex,
      }
    }
    return this.props.getRowStyle && this.props.getRowStyle(params)
  }

  render() {
    const { rows, onCellValueChanged, suppressDragLeaveHidesColumns, isDisabled } = this.props
    const tableProps = {
      getRowStyle: this.getRowStyle,
      rowData: rows,
      columnDefs: this.renderColumns(),
      rowDragManaged: true,
      animateRows: true,
      rowSelection: "multiple",
      frameworkComponents,
      components,
      rowHeight: 40,
      onCellValueChanged,
      suppressDragLeaveHidesColumns,
      suppressCellSelection: isDisabled,
      ...this.props,
      onRowDragEnd: (event) => this.props.onRowDragEnd(event.node.data.key, event.overIndex),
    }
    return (
      <Container className={`ag-theme-balham${isDisabled ? " ag-disabled" : ""}`}>
        <AgGridReact {...tableProps} />
      </Container>
    )
  }
}

TableWithTheme.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onCellValueChanged: PropTypes.func,
  onRowDragEnd: PropTypes.func,
  onRowSelected: PropTypes.func,
  suppressDragLeaveHidesColumns: PropTypes.bool,
  isDisabled: PropTypes.bool,
  theme: PropTypes.object,
  gridOptions: PropTypes.object,
  singleClickEdit: PropTypes.bool,
  onGridReady: PropTypes.func,
  getRowStyle: PropTypes.func,
  animateRows: PropTypes.bool,
}

TableWithTheme.defaultProps = {
  suppressDragLeaveHidesColumns: true,
  isDisabled: false,
  theme: colourPalette.examplePalette,
  gridOptions,
  singleClickEdit: true,
  animateRows: true,
}

const Table = withTheme(TableWithTheme)
Table.displayName = "Table"

export default Table
