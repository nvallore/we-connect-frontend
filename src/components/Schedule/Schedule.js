import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, } from 'react-bootstrap'
// import TableContainer from './TableContainer';
import PaginatedTable from './PaginatedTable';
import AddMoMButton from './AddMoMButton';
import { getScheduleData } from '../../services/schedule-service';
import { useSelector } from 'react-redux';
// import { useState } from "react";
class AddMoM extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center', fontSize: 18 }}>
                <textarea type="text" defaultValue={this.props.value} id={this.props.textBoxId} disabled={this.props.isDisabled}></textarea>
            </div>
        );
    }
}
const Schedule = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});

  const userData = useSelector(state => state.user)

    useEffect(() => {
        // { id: "mentor3", roleId: 'alumni' }
        const request = {
            id: userData?.registrationId,
            roleId: userData?.role
            // roleId: 'alumni'
        };

        getScheduleData(request)
            .then(
                (result) => {
                    result?.schedule?.map(s => {
                        let slotData = result.slotData
                        let noteData = result.notes
                        s.date = slotData[s.slotId].date
                        s.name = slotData[s.slotId].mentorName
                        s.notes = s.noteId ? noteData[s.noteId].notes : ''
                        return s
                    })
                    setItems(result.schedule)
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    var roleId = userData?.role,headerId,accessorId,headerName,accessorName
    // var roleId = 'student',headerId,accessorId,headerName,accessorName
    if(roleId === 'student'){
        headerId = 'Alumni ID'
        accessorId = 'mentorId'
        headerName = 'Alumni Name'
        accessorName = 'name'
    }
    else if (roleId === 'alumni'){
        headerId = 'Student ID'
        accessorId = 'menteeId'
        headerName = 'Student Name'
        accessorName = 'menteeName'
    }

    const columnSchedule = useMemo(
        () => [
            {
                Header: headerId,
                accessor: accessorId
            },
            {
                Header: headerName,
                accessor: accessorName
            },
            {
                Header: "Meet Link",
                accessor: "meetLink",
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "MoM",
                accessor: "textMoM",
                type: "text",
                Cell: ({ cell }) => {
                    let value = cell.row.original.notes;
                    let isDisabled = value === '' ? false : true
                    return (
                        <AddMoM value={value} cell={cell} textBoxId={"textBoxId" + cell.row.id} isDisabled={isDisabled} />
                    );
                },
            },
            {
                Header: " ",
                // accessor: "addMoM",
                type: "button",
                Cell: ({ cell }) => {
                    let value = cell.row.original.notes;
                    let isDisabled = value === '' ? false : true
                    return (
                        <AddMoMButton cell={cell} isDisabled={isDisabled} />
                    );
                },
            }
        ],
        []
    ) 



    if (!isLoaded) {
        return (
            <div>

                <div className='container mt-5'><h1>My Schedule</h1></div>

            </div>

        )
    }
    return (
        <Container style={{ marginTop: 100 }}>

            <Row><center><h1>My Schedule</h1></center></Row>
            <Row>
                { items.length > 0?
                <Col>
                    <PaginatedTable columns={columnSchedule} data={items} />
                </Col>
                :
                <Col>
                <div>No Calls Scheduled Yet</div>
                </Col>
                }
            </Row>
        </Container>
    )
}

export default Schedule;