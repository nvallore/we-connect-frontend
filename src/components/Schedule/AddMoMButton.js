import React from 'react';
import { Button } from "react-bootstrap";
import { submitNotes } from '../../services/schedule-service';
export default class AddMoMButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClickListener = this.onClickListener.bind(this);
    }

    render() {
        return (<div style={{ textAlign: 'center', fontSize: 18 }}>
            <Button outline variant="success" onClick={this.onClickListener} disabled={this.props.isDisabled}>Add</Button>
        </div>);
    }

    onClickListener() {
        console.log("this.props.cell => ", this.props.cell)
        var addPayload = {
            "notes": document.getElementById('textBoxId'+this.props.cell.row.id).value,
            "slotId": this.props.cell.row.original.slotId
          };
          submitNotes(addPayload).then(
            res => console.log("Response => ", res)
        );

        //   fetch("http://localhost/updateNotes", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(addPayload)
        // })
        //     .then(res => res.json())
    }
}