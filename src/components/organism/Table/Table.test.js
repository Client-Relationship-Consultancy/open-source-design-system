import React from "react"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import { AgGridReact } from "ag-grid-react"
import "jest-styled-components"
import { colourPalette } from "../../../brandColours"

import { TableWithTheme, gridOptions, Container, frameworkComponents } from "./Table"

const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    filter: true,
    sortable: true,
  },
  { field: "lastName", headerName: "Last Name", filter: true, sortable: true },
]

const rows = [
  { firstName: "Teddy", lastName: "Bear" },
  { firstName: "Arctic", lastName: "Monkeys" },
  { firstName: "Poney Poney", lastName: "Run Run" },
  { firstName: "Baby", lastName: "Shark" },
]

const mockOnRowDragEnd = jest.fn()

describe("TableWithTheme Component Testing", () => {
  const component = shallow(
    <TableWithTheme rows={rows} columns={columns} onRowDragEnd={mockOnRowDragEnd} />,
  )
  it("Should match the snapshot of <TableWithTheme />", () => {
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("Should handle onRowDragEnd", () => {
    const event = {
      node: {
        data: {
          key: "field",
        },
      },
      overIndex: "index",
    }
    component
      .find(AgGridReact)
      .props()
      .onRowDragEnd(event)
    expect(mockOnRowDragEnd).toHaveBeenCalledWith("field", "index")
  })

  it("getRowstyle", () => {
    const { getRowStyle } = gridOptions
    expect(getRowStyle({ data: { highlighted: "red" } })).toEqual({ background: "red" })
    expect(getRowStyle({ data: {} })).toEqual({})
  })

  it("highlights rows if specified", () => {
    const highlightComp = shallow(
      <TableWithTheme
        rows={[...rows, { firstName: "Teddy", lastName: "Bear", hightlighted: "red" }]}
        columns={columns}
        onRowDragEnd={mockOnRowDragEnd}
      />,
    )
    const highlightTree = toJson(highlightComp)
    expect(highlightTree).toMatchSnapshot()
  })
})

describe("Table editing logic", () => {
  const commonProps = {
    columns: [
      {
        field: "firstName",
        editable: true,
      },
    ],
    rows: [...rows],
  }
  it("should have editable as false when table is locked", () => {
    const table = shallow(<TableWithTheme {...commonProps} isDisabled />)
    expect(
      table
        .instance()
        .renderColumns()[0]
        .editable(),
    ).toBeFalsy()
  })

  it("should have editable as true when table is unlocklocked and editable prop is true", () => {
    const table = shallow(<TableWithTheme {...commonProps} isDisabled={false} />)
    expect(
      table
        .instance()
        .renderColumns()[0]
        .editable(),
    ).toBeTruthy()
  })
  it("should have editable as false when table is unlocklocked and editable prop is false", () => {
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
          editable: false,
        },
      ],
    }
    const table = shallow(<TableWithTheme {...props} />)
    expect(
      table
        .instance()
        .renderColumns()[0]
        .editable(),
    ).toBeFalsy()
  })
  it("should return a boolean when table is unlocklocked and editable prop is a function", () => {
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
          editable: () => true,
        },
      ],
    }
    const table = shallow(<TableWithTheme {...props} />)
    expect(
      table
        .instance()
        .renderColumns()[0]
        .editable(),
    ).toBeTruthy()
  })
  it("should return true when table is unlocklocked and editable prop is not passed", () => {
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
        },
      ],
    }
    const table = shallow(<TableWithTheme {...props} />)
    expect(
      table
        .instance()
        .renderColumns()[0]
        .editable(),
    ).toBeTruthy()
  })

  it("should return css styling when table is disabled for getRowStyle", () => {
    const getRowStyleMock = jest.fn()
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
        },
      ],
      theme: colourPalette.examplePalette,
      isDisabled: true,
      getRowStyle: getRowStyleMock,
    }
    const table = shallow(<TableWithTheme {...props} />)
    expect(getRowStyleMock).not.toHaveBeenCalled()
    expect(table.instance().getRowStyle()).toEqual({
      background: "#ECECEC",
      borderColor: "#ECECEC",
      color: "#696969",
    })
  })

  it("should return props getRowStyle when it exists and the table is not disabled", () => {
    const getRowStyleMock = jest.fn()
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
        },
      ],
      isDisabled: false,
      getRowStyle: getRowStyleMock,
    }
    const table = shallow(<TableWithTheme {...props} />)
    table.instance().getRowStyle("fake params")
    expect(getRowStyleMock).toHaveBeenCalledWith("fake params")
  })

  it("should return false when table is not disabled and getRowStyle does not exist", () => {
    const props = {
      ...commonProps,
      columns: [
        {
          field: "firstName",
        },
      ],
      isDisabled: false,
    }
    const table = shallow(<TableWithTheme {...props} />)
    expect(table.instance().getRowStyle()).toBeFalsy()
  })
})

describe("Container component", () => {
  it("should snapshot the container", () => {
    const component = shallow(<Container>Hi</Container>)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })

  it("should have the correct styling for disabled", () => {
    const component = mount(
      <Container theme={colourPalette.examplePalette} className="ag-disabled">
        Hi
      </Container>,
    )
    expect(component).toHaveStyleRule("background", "#ECECEC", {
      modifier: "&.ag-disabled",
    })
  })
})

describe("Table frameworkComponents", () => {
  it("should match snapshot", () => {
    expect(frameworkComponents).toMatchSnapshot()
  })
})
