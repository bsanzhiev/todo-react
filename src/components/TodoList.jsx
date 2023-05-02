import { useEffect } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useGetTodos } from "../api";
// import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import TodoItem from "./TodoItem";
import { List } from "antd";

function TodoList({ todos, removeTodo }) {
  // const todos = useSelector((state) => state.todos.items);
  // const status = useSelector((state) => state.todos.status);
  // const error = useSelector((state) => state.todos.error);
  // const getTodos = useGetTodos();

  // useEffect(() => {
  //   getTodos();
  // }, [getTodos]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  // if (status === "failed") {
  //   return <div>Error: {error}</div>;
  // }

  // const todos = useSelector((state) => state.todos);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const reverseTodos = todos.slice().reverse();

  return (
    <List
      className="todo-list"
      size="large"
      locale={{
        emptyText: "You don't have any todos yet. Enjoy your day!",
      }}
      dataSource={reverseTodos}
      renderItem={(todo) => <TodoItem todo={todo} removeTodo={removeTodo} />}
    />
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
