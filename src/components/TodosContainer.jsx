import { useDispatch } from "react-redux";
import { fetchTodos } from "../store/todosSlice";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useEffect } from "react";

import { Row, Col, Card, Typography } from "antd";
const Title = Typography.Title;

function TodosContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Row
      justify="center"
      align={"middle"}
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Title level={1}>Todo App Demo</Title>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 16 }}
        xl={{ span: 13 }}
      >
        <Card className="todo-form-card-hello">
          <TodoForm className="todo-form" />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 16 }}
        xl={{ span: 13 }}
      >
        <Card className="card-item-hello" title="Todos Lists">
          <TodoList />
        </Card>
      </Col>
    </Row>
  );
}

export default TodosContainer;
