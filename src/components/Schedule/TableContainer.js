import React from "react"
import { useTable,useFilters } from "react-table"
import { Table } from 'reactstrap';

const TableComponent = ({ columns, data }) => {
  var {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },
  useFilters
  )

  return (
    <Table striped hover {...getTableProps()}>
      <thead className="table-dark">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) =>  {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {columns:this.props.columns, data:this.props.data}

  }

  primaryKeyAccessor(){
    return 'defaultId';
  }

  render(){
    return (
      <>
      <TableComponent columns={this.state.columns} data={this.state.data}/>
      </>
    )
  }
  
}