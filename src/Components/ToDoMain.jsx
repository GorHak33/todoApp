import { useEffect, useMemo, useState } from "react";
import TodoPrint from "./TodoPrint";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button } from "react-bootstrap";
import Confirm from "./Confirm";
import CreateEditTodo from "./CreateEditTodo";
import { useDispatch, useSelector } from "react-redux";
import {
  getTask,
  addTask,
  deleteTask,
  deleteTasks,
  editTask,
} from "../Redux/todoSlice/todoSlice";

function ToDoMain() {
  const [todo, setToDo] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalType, setModalType] = useState();
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ ...todo });

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.todo.status === "pending");

  const showCreateModal = () => {
    setModalType("create");
    setShowCreateEditModal(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
    setShowCreateEditModal(false);
    setEditTaskData("");
  };

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const addNewTask = task => {
    dispatch(addTask(task));
    handleClose();
  };

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const deleteById = _id => {
    dispatch(deleteTask(_id));
  };

  const toggleTodo = _id => {
    const selectedId = selectedTodos;
    if (selectedId.has(_id)) {
      selectedId.delete(_id);
    } else {
      selectedId.add(_id);
    }
    setSelectedTodos(new Set(selectedId));
  };

  const openConfirm = () => {
    setShowConfirm(true);
  };

  const onDelete = () => {
    const selectedTodosArray = Array.from(selectedTodos);
    dispatch(deleteTasks(selectedTodosArray));
    setSelectedTodos(new Set());
    setShowConfirm(false);
  };

  const handleEdit = edit => {
    setShowCreateEditModal(true);
    setModalType("edit");
    setEditTaskData(edit);
  };

  const saveChanges = (values, _id) => {
    dispatch(editTask({ values, _id }));
    setShowCreateEditModal(false);
  };

  const onSave = (values, _id) => {
    _id ? saveChanges(values, _id) : addNewTask(values);
  };

  const todoWithMemo = useMemo(
    () => (
      <TodoPrint
        todo={todo}
        deleteById={deleteById}
        toggleTodo={toggleTodo}
        selectedTodos={selectedTodos}
        handleEdit={handleEdit}
      />
    ),
    [todo, selectedTodos]
  );

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
        "Conquer Your Day: A Productive To-Do List"
      </h1>
      <Container>
        <Row>
          <Button
            variant="primary"
            onClick={showCreateModal}
            disabled={selectedTodos.size > 0 ? true : false}
          >
            Add new Task
          </Button>
          <CreateEditTodo
            modalType={modalType}
            onSave={onSave}
            selectedTodos={selectedTodos}
            show={showCreateEditModal}
            handleClose={handleClose}
            editTaskData={editTaskData}
          />

          {/* <TodoPrint
            todo={todo}
            deleteById={deleteById}
            toggleTodo={toggleTodo}
            selectedTodos={selectedTodos}
            handleEdit={handleEdit}
          /> */}
          {todoWithMemo}
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => openConfirm()}
            variant="danger"
            disabled={selectedTodos.size === 0}
          >
            Delete All Selected
          </Button>
        </Row>
        {showConfirm && (
          <Confirm
            show={showConfirm}
            handleClose={handleClose}
            onDelete={onDelete}
            count={selectedTodos.size}
            closeConfirm={closeConfirm}
          />
        )}
      </Container>
    </>
  );
}

export default ToDoMain;
