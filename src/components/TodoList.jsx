import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

import { List, Spin } from "antd";

function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  // const reverseTodos = todos.slice().reverse();

  if (status === "loading") {
    return (
      <div>
        {"   "}
        <Spin>
          <div className="content" />
        </Spin>
      </div>
    );
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <List
      className="todo-list"
      size="large"
      locale={{
        emptyText: "You don't have any todos yet. Enjoy your day!",
      }}
      dataSource={todos}
      renderItem={(todo) => <TodoItem {...todo} />}
    />
  );
}

export default TodoList;
