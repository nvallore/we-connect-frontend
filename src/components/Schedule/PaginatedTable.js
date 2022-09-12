import React, { Fragment , useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filter';
import { useExportData } from 'react-table-plugins';
// import Papa from "papaparse";
// import JsPDF from "jspdf";
// import "jspdf-autotable";
// import XLSX from "xlsx";


const PaginatedTable = ({ columns, data, renderRowSubComponent }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      visibleColumns,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
      exportData,
    } = useTable(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 10 },
        // getExportFileBlob,
      },
      useFilters,
      useSortBy,
      useExpanded,
      usePagination,
      useExportData
    );
  const[dataToDownload,setDataToDownload] = useState([]);
    const generateSortingIndicator = (column) => {
      return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };
  
    const onChangeInSelect = (event) => {
      setPageSize(Number(event.target.value));
    };
  
    const onChangeInInput = (event) => {
      const page = event.target.value ? Number(event.target.value) - 1 : 0;
      gotoPage(page);
    };

    // function getExportFileBlob({ columns, data, fileType, fileName }) {
    //   if (fileType === "csv") {
    //     const headerNames = columns.map((col) => col.exportValue);
    //     const csvString = Papa.unparse({ fields: headerNames, data });
    //     return new Blob([csvString], { type: "text/csv" });
      
    //   } else if (fileType === "xlsx") {
    
    //     const header = columns.map((c) => c.exportValue);
    //     const compatibleData = data.map((row) => {
    //       const obj = {};
    //       header.forEach((col, index) => {
    //         obj[col] = row[index];
    //       });
    //       return obj;
    //     });
    
    //     let wb = XLSX.utils.book_new();
    //     let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
    //       header,
    //     });
    //     XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    //     XLSX.writeFile(wb, `${fileName}.xlsx`);
    //     return false;
    //   }
    //   if (fileType === "pdf") {
    //     const headerNames = columns.map((column) => column.exportValue);
    //     const doc = new JsPDF();
    //     doc.autoTable({
    //       head: [headerNames],
    //       body: data,
    //       margin: { top: 20 },
    //       styles: {
    //         minCellHeight: 15,
    //         halign: "left",
    //         valign: "center",
    //         fontSize: 9,
    //       },
    //     });
    //     doc.save(`${fileName}.pdf`);
    
    //     return false;
    //   }
    
    //   return false;
    // }

    var data = [];
    // const onCSVExport = (event) => {
        
    //     page.forEach(element => {
    //         data.push([element.values]);
    //     });

    //     setDataToDownload(data);
    //     this.setState({ dataToDownload: data }, () => {
    //         this.csvLink.link.click()
    //      });
    // }
    return (
      <Fragment>
        <Row style={{ marginBottom: 1 }}>
        <Col style={{ textAlign: 'right' }} >
        {/* <Button
        onClick={() => {
          exportData("csv", true);
        }}
      >
        Export as CSV
      </Button> &nbsp;
      <Button
        onClick={() => {
          exportData("xlsx", true);
        }}
      >
        Export as XLSX
      </Button> &nbsp;
      <Button
        onClick={() => {
          exportData("pdf", true);
        }}
      >
        Export as PDF
      </Button> */}
      </Col>
      </Row>
          {/* <CSVLink data={dataToDownload} filename="data.csv" className="" target="_blank"> <Button onClick={onCSVExport}>Export to CSV</Button> </CSVLink> */}
         <Row> 
        <Table hover striped {...getTableProps()}>
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        </Row>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <Col md={3}>
            <Button
              color='secondary'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>
            <Button
              color='secondary'
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {'<'}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <Input type='select'
              value={pageSize}
              onChange={onChangeInSelect}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={3}>
            <Button color='secondary' onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button
              color='secondary'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  };

export default PaginatedTable;