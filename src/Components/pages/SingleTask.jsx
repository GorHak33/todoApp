import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Col, Card } from "react-bootstrap";
import CreateEditTodo from "../Create&Edit/CreateEditTodo";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleTask,
  getSingleTask,
  saveSingleTaskEdit,
} from "../../Redux/singleTaskSlice/singleTaskSlice";

export default function SingleTask() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();
  const singleTask = useSelector(state => state.singleTask.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleTask(taskId));
  }, [taskId, dispatch]);

  const deleteById = () => {
    dispatch(deleteSingleTask(taskId));
    navigate("/");
  };

  const handleEdit = () => {
    setOpenModal(true);
    setModalType("Edit");
  };

  const handleSaveTask = task => {
    dispatch(saveSingleTaskEdit({ taskId: taskId, task: task }));
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <h1
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "20px",
          marginTop: "5px",
        }}
      >
        Chosen Task Data
      </h1>
      {singleTask == null ? (
        <Loader />
      ) : (
        <Col key={singleTask._id} xs={12} sm={12} md={6} xl={10} lg={5}>
          <Card style={{ margin: "10px" }}>
            <Card.Body>
              <Card.Title>Title: {singleTask?.title}</Card.Title>
              <Card.Text>Description: {singleTask?.description}</Card.Text>
              <Card.Text>Date: {singleTask?.date?.slice(0, 10)}</Card.Text>
              <Button onClick={() => deleteById()} variant="danger">
                Delete
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: "9px" }}
                onClick={() => handleEdit()}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )}
      {openModal && (
        <CreateEditTodo
          modalType={modalType}
          onSave={handleSaveTask}
          show={openModal}
          handleClose={handleClose}
          editTaskData={singleTask}
        />
      )}
    </>
  );
}
