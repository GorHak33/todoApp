import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

export default function CreateEditTodo({
  modalType,
  onSave,
  show,
  handleClose,
  editTaskData,
}) {
  const [state, setState] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (editTaskData) {
      setState({
        title: editTaskData.title,
        description: editTaskData.description,
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [editTaskData]);

  const inputChange = event => {
    const { name, value } = event.target;
    setState(prev => ({
      ...prev,
      [name]:
        name === "date" ? new Date(value).toISOString().slice(0, 10) : value,
    }));
  };

  const onSubmit = () => {
    setState({
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    onSave(state, modalType === "edit" ? editTaskData?._id : "");
  };

  const hide = () => {
    setState({
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    handleClose();
  };
  const inputTitleRef = useRef(null);

  useEffect(() => {
    if (show) {
      inputTitleRef.current.focus();
    }
  }, [show]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>
            {modalType === "create" ? "Add new Task" : "Do your changes"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              name="title"
              onChange={inputChange}
              type="text"
              placeholder="Enter Task Title"
              value={state.title}
              ref={inputTitleRef}
            />
          </InputGroup>

          <InputGroup style={{ padding: "10px" }}>
            <Form.Control
              name="description"
              as="textarea"
              placeholder="Leave a description here"
              onChange={inputChange}
              value={state.description}
            />
          </InputGroup>
          <InputGroup style={{ padding: "10px" }}>
            <Form.Control
              name="date"
              type="date"
              placeholder="Select a date"
              onChange={inputChange}
              value={state.date}
              min={new Date().toISOString().slice(0, 10)}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onSubmit}>
            {modalType === "create" ? "Add task" : "Save changes"}
          </Button>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
