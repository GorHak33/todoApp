import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Confirm(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure to delete {props.count} tasks
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onDelete}>
          Delete
        </Button>
        <Button onClick={props.closeConfirm}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
