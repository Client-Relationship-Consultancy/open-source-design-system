import React from "react"

import { storiesOf } from "@storybook/react"
import { text, boolean } from "@storybook/addon-knobs"

import Table from "./Table"

storiesOf("Table", module)
  .add("default table", () => {
    const columns = [
      { headerName: "Name", field: "name" },
      {
        headerName: "Compulsory",
        field: "compulsory",
        cellRenderer: "checkboxRenderer",
      },
      {
        headerName: "Mandatory",
        field: "mandatory",
        cellRenderer: "toggleRenderer",
      },
      {
        headerName: "Confirmed",
        field: "confirmed",
        cellRenderer: "checkRenderer",
        width: 100,
      },
      {
        headerName: "Attending",
        field: "attending",
        width: 100,
        cellRenderer: "checkRenderer",
        cellRendererParams: {
          size: "1rem",
        },
      },
      { headerName: "Default", field: "default" },
      { headerName: "Type", field: "type" },
    ]

    const rows = [
      {
        name: "Account",
        compulsory: true,
        mandatory: false,
        default: "account 1",
        type: "short text",
        highlighted: `${text("Highlight 1st Row Color", "#8BC53F")}`,
        key: 1,
        confirmed: true,
        attending: true,
      },
      {
        name: "Survey Name",
        compulsory: false,
        mandatory: false,
        default: "Epic survey",
        type: "short text",
        key: 2,
        confirmed: false,
        attending: true,
      },
      {
        name: "Income",
        compulsory: false,
        mandatory: true,
        default: 200000,
        type: "number",
        key: 3,
        attending: false,
      },
    ]

    const defaultValues = {
      name: "",
      compulsory: true,
      mandatory: false,
      default: "",
      type: "",
    }

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        displayDeleteButton
        columns={columns}
        rows={rows}
        singleClickEdit={boolean("Single click edit", true)}
        defaultValues={defaultValues}
        suppressDragLeaveHidesColumns={boolean("Suppress remove columns with drag", true)}
      />
    )
  })
  .add("table with a button column", () => {
    const columns = [
      { headerName: "Name", field: "name" },
      {
        headerName: "Action",
        field: "action",
        cellRendererSelector: colParams => ({
          component: "actionCellRenderer",
          params: {
            actionCellRendererParams: {
              label: colParams.value ? "Add" : "Delete",
              buttonType: colParams.value ? "complimentary" : "error",
            },
          },
        }),
      },
    ]

    const rows = [
      { name: "User 1", action: true },
      { name: "User 2", action: true },
      { name: "User 3", action: false },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        displayDeleteButton
        singleClickEdit={boolean("Single click edit", true)}
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Checkbox row selection", () => {
    const columns = [
      {
        field: "name",
        headerName: "Name",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
    ]
    const rows = [
      { name: "Account", key: 1 },
      { name: "Survey Name", key: 2 },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        singleClickEdit={boolean("Single click edit", true)}
        displayDeleteButton
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Table with draggable rows", () => {
    const columns = [
      { field: "firstName", headerName: "First Name", rowDrag: true },
      { field: "lastName", headerName: "Last Name" },
      {
        headerName: "Active",
        field: "active",
        cellRenderer: "checkboxRenderer",
      },
    ]
    const rows = [
      { firstName: "Teddy", lastName: "Bear", active: true },
      { firstName: "Arctic", lastName: "Monkeys", active: false },
      { firstName: "Poney Poney", lastName: "Run Run", active: true },
      { firstName: "Baby", lastName: "Shark", active: true },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        singleClickEdit={boolean("Single click edit", true)}
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        displayDeleteButton
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Sortable table", () => {
    const columns = [
      { field: "firstName", headerName: "First Name", sortable: true },
      { field: "lastName", headerName: "Last Name", sortable: true },
      {
        headerName: "Active",
        field: "active",
        cellRenderer: "checkboxRenderer",
        sortable: true,
      },
    ]
    const rows = [
      { firstName: "Teddy", lastName: "Bear", active: true },
      { firstName: "Arctic", lastName: "Monkeys", active: false },
      { firstName: "Poney Poney", lastName: "Run Run", active: true },
      { firstName: "Baby", lastName: "Shark", active: true },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        singleClickEdit={boolean("Single click edit", true)}
        displayAddNewButton
        displayDeleteButton
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Filterable table", () => {
    const columns = [
      { field: "firstName", headerName: "First Name", filter: true },
      { field: "lastName", headerName: "Last Name", filter: true },
      {
        headerName: "Active",
        field: "active",
        cellRenderer: "checkboxRenderer",
        filter: true,
      },
    ]
    const rows = [
      { firstName: "Teddy", lastName: "Bear", active: true },
      { firstName: "Arctic", lastName: "Monkeys", active: false },
      { firstName: "Poney Poney", lastName: "Run Run", active: true },
      { firstName: "Baby", lastName: "Shark", active: true },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        displayDeleteButton
        singleClickEdit={boolean("Single click edit", true)}
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Resizable table + SelectRenderer", () => {
    const columns = [
      { headerName: "Name", field: "name" },
      {
        headerName: "Type",
        field: "type",
        editable: true,
        cellEditor: "selectRenderer",
        cellEditorParams: {
          values: ["short text", "number", "list"],
          isClearable: boolean("Enable select clearing", true),
        },
        resizable: true,
        cellRenderer: "selectValueRenderer",
        cellClass: "select",
      },
      {
        headerName: "Compulsory",
        field: "compulsory",
        cellRenderer: "checkboxRenderer",
      },
      {
        headerName: "Mandatory",
        field: "mandatory",
        cellRenderer: "toggleRenderer",
      },
      { headerName: "Default", field: "default" },
    ]

    const rows = [
      {
        name: "Account",
        compulsory: true,
        mandatory: false,
        default: "account 1",
        type: "short text",
      },
      {
        name: "Survey Name",
        compulsory: false,
        mandatory: false,
        default: "Epic survey",
        type: "short text",
      },
      { name: "Income", compulsory: false, mandatory: true, default: 200000, type: "number" },
    ]

    return (
      <Table
        singleClickEdit={boolean("Single click edit", true)}
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        displayAddNewButton
        displayDeleteButton
        columns={columns}
        rows={rows}
        stopEditingWhenGridLosesFocus
      />
    )
  })
  .add("Custom Header: Tooltip + Filterable + Sortable + Selection", () => {
    const columns = [
      {
        field: "firstName",
        headerName: "First Name",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        headerComponent: "tooltipHeader",
        headerComponentParams: {
          displayName: "First Name",
          tooltipContent: "I am the tooltip. Look at me",
        },
      },
      { field: "lastName", headerName: "Last Name" },
      {
        headerName: "Active",
        field: "active",
        cellRenderer: "checkboxRenderer",
        headerComponent: "tooltipHeader",
        headerComponentParams: {
          displayName: "Active",
          tooltipContent: "I am the second tooltip",
        },
      },
    ].map(col => ({
      ...col,
      filter: true,
      sortable: true,
    }))

    const rows = [
      { firstName: "Teddy", lastName: "Bear", active: true },
      { firstName: "Arctic", lastName: "Monkeys", active: false },
      { firstName: "Poney Poney", lastName: "Run Run", active: true },
      { firstName: "Baby", lastName: "Shark", active: true },
    ]

    return (
      <Table
        addNewButtonMessage="Add New"
        deleteButtonMessage="Delete Selected"
        singleClickEdit={boolean("Single click edit", true)}
        displayAddNewButton
        displayDeleteButton
        columns={columns}
        rows={rows}
      />
    )
  })
  .add("Disable table", () => {
    const columns = [
      { headerName: "Name", field: "name" },
      {
        headerName: "Type",
        field: "type",
        editable: true,
        cellEditor: "selectRenderer",
        cellEditorParams: {
          values: ["short text", "number", "list"],
        },
        resizable: true,
        cellRenderer: "selectValueRenderer",
        cellClass: "select",
      },
      {
        headerName: "Compulsory",
        field: "compulsory",
        cellRenderer: "checkboxRenderer",
      },
      {
        headerName: "Mandatory",
        field: "mandatory",
        cellRenderer: "toggleRenderer",
      },
      { headerName: "Default", field: "default" },
      {
        headerName: "Action",
        field: "action",
        cellRendererSelector: colParams => ({
          component: "actionCellRenderer",
          params: {
            actionCellRendererParams: {
              label: colParams.value ? "Add" : "Delete",
              theme: colParams.value ? "complimentary" : "danger",
              disabled: !!colParams.value,
            },
          },
        }),
      },
    ]

    const rows = [
      {
        name: "Account",
        compulsory: true,
        mandatory: false,
        default: "account 1",
        type: "short text",
        action: { value: "hello" },
      },
      {
        name: "Survey Name",
        compulsory: false,
        mandatory: false,
        default: "Epic survey",
        type: "short text",
      },
      { name: "Income", compulsory: false, mandatory: true, default: 200000, type: "number" },
    ]

    return <Table isDisabled={boolean("Disable table", true)} columns={columns} rows={rows} />
  })
