import { useEffect, useState } from "react";

import { Row, Col, Card, Typography } from "antd";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const Title = Typography.Title;

function TodosContainer() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn React",
      completed: false,
    },
  ]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

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
        <Title level={1}>Todo App Example</Title>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 16 }}
        xl={{ span: 13 }}
      >
        <Card className="todo-form-card-hello">
          <TodoForm className="todo-form" addTodo={addTodo} />
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
          <TodoList todos={todos} removeTodo={removeTodo} />
        </Card>
      </Col>
    </Row>
  );
}

export default TodosContainer;
