import React from "react";
import { Button, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cutString } from "../../helpers/cutString";
import { changeStatus } from "../../Redux/todoSlice/todoSlice";
import {
  Trash,
  Pencil,
  Check2,
  ArrowCounterclockwise,
} from "react-bootstrap-icons";

export default function TodoPrint(props) {
  const todoData = useSelector(state => state.todo.data) ?? [];

  const dispatch = useDispatch();

  return (
    <>
      {todoData.length !== 0 ? (
        todoData.map(todos => {
          return (
            <Col key={todos?._id} xs={12} sm={6} md={4} xl={3} lg={3}>
              <Card style={{ margin: "10px" }}>
                <Card.Body>
                  <input
                    type="checkbox"
                    onChange={() => props.toggleTodo(todos?._id)}
                  />
                  <Link to={`/singletask/${todos?._id}`}>
                    <Card.Title>
                      Title: {cutString(todos?.title, 20)}
                    </Card.Title>
                  </Link>
                  <Card.Text>
                    Description: {cutString(todos?.description, 50)}
                  </Card.Text>
                  <Card.Text>
                    Status: <b>{cutString(todos?.status, 50)}</b>
                  </Card.Text>
                  <Card.Text>Date: {todos?.date.slice(0, 10)}</Card.Text>
                  <Button
                    onClick={() => props.deleteById(todos._id)}
                    variant="danger"
                    disabled={props.selectedTodos.size > 0 ? true : false}
                  >
                    <Trash size={20} />
                  </Button>
                  <Button
                    variant="warning"
                    disabled={props.selectedTodos.size > 0 ? true : false}
                    style={{ marginLeft: "9px" }}
                    onClick={() => props.handleEdit(todos)}
                  >
                    <Pencil size={20} />
                  </Button>
                  {todos.status === "active" ? (
                    <Button
                      variant="success"
                      disabled={props.selectedTodos.size > 0 ? true : false}
                      style={{ marginLeft: "9px" }}
                      onClick={() =>
                        dispatch(
                          changeStatus({ status: "done", _id: todos._id })
                        )
                      }
                    >
                      <Check2 size={20} />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      disabled={props.selectedTodos.size > 0 ? true : false}
                      style={{ marginLeft: "9px" }}
                      onClick={() =>
                        dispatch(
                          changeStatus({ status: "active", _id: todos._id })
                        )
                      }
                    >
                      <ArrowCounterclockwise size={20} />
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <p>No tasks to show</p>
      )}
    </>
  );
}

TodoPrint.propTypes = {
  toggleTodo: PropTypes.func,
};
