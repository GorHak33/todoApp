import { useEffect, useMemo, useState } from "react";
import TodoPrint from "./TodoPrint";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button } from "react-bootstrap";
import Confirm from "./Confirm";
import CreateEditTodo from "./CreateEditTodo";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../Redux/todoSlice/todoSlice";
import request from "../helpers/request";

function ToDoMain() {
  const [todo, setToDo] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalType, setModalType] = useState();
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ ...todo });

  // const dispatch = useDispatch();
  // const todoData = useSelector(state => state.todo.data ?? []);
  const todoStatus = useSelector(state => state.todo.status);

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

  const addNewTask = async task => {
    try {
      const response = await request(
        "http://localhost:3001/task",
        "POST",
        JSON.stringify(task)
      );
      const tasks = [...todo, response];
      setToDo(tasks);
    } catch (error) {
      throw new Error();
    }
    handleClose();
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await request("http://localhost:3001/task", "GET");
        setToDo(response);
      } catch (error) {
        throw new Error();
      }
    };
    getTask();
  }, []);

  const deleteById = async _id => {
    try {
      await request(`http://localhost:3001/task/${_id}`, "DELETE");
      const filtered = todo.filter(elems => {
        return elems._id !== _id;
      });
      setToDo(filtered);
    } catch (error) {
      throw new Error();
    }
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

  const onDelete = async () => {
    const body = {
      tasks: [...selectedTodos],
    };

    try {
      await request(
        "http://localhost:3001/task",
        "PATCH",
        JSON.stringify(body)
      );
    } catch (error) {
      throw new Error();
    }
    const filteredTodo = todo.filter(todos => {
      if (selectedTodos.has(todos._id)) {
        return false;
      } else {
        return true;
      }
    });
    setToDo(filteredTodo);
    setSelectedTodos(new Set());
    setShowConfirm(false);
  };

  const handleEdit = edit => {
    setShowCreateEditModal(true);
    setModalType("edit");
    setEditTaskData(edit);
  };

  const saveChanges = async (values, _id) => {
    try {
      await request(
        `http://localhost:3001/task/${_id}`,
        "PUT",
        JSON.stringify(values)
      );
    } catch (error) {
      throw new Error();
    }
    setToDo(prev =>
      prev.map(el =>
        el._id === _id
          ? {
              ...el,
              title: values.title,
              description: values.description,
              date: values.date,
            }
          : el
      )
    );
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
      {todoStatus ? <h1>{todoStatus}</h1> : null}

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
