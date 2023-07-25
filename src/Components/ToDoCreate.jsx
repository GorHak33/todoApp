import React from "react";
import { Form, InputGroup, Button, Modal, ModalBody } from "react-bootstrap";
export default function ToDo(props) {
  return (
    <>
      <Button
        variant="primary"
        onClick={props.handleShow}
        disabled={props.selectedTodos.size > 0 ? true : false}
      >
        Add new Task
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Enter your task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              onChange={props.toDoCreator}
              type="text"
              placeholder="Enter Task Title"
              required
            />
          </InputGroup>

          <InputGroup style={{ padding: "10px" }}>
            <Form.Control
              as="textarea"
              placeholder="Leave a description here"
              onChange={props.descCreator}
            />
          </InputGroup>

          <InputGroup style={{ padding: "10px" }}>
            {/* <input type="date" name="" id="" value={props.date} /> */}
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => props.handleClick()}>
            Add task
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
