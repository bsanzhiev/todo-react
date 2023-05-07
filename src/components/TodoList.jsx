import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

import { List, Spin } from "antd";

function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  const sortTodos = todos.slice().sort((a, b) => {
    const dateA = new Date(a.createTag);
    const dateB = new Date(b.createTag);
    return dateB - dateA;
  });

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
        emptyText: "Танд хараахан хийх зүйл алга. Өдрийг сайхан өнгөрүүлээрэй!",
      }}
      dataSource={sortTodos}
      renderItem={(todo) => <TodoItem {...todo} />}
    />
  );
}

export default TodoList;
