import { useState } from "react";
import PropTypes from "prop-types";
import {
  Popconfirm,
  Button,
  List,
  Checkbox,
  Typography,
  Input,
} from "antd";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

// import { useDispatch } from "react-redux";
// import { deleteTodo, editTodo } from "../store/localTodosSlice";
// import { useState } from "react";
// import TodoForm from "./TodoForm";
// import { useDeleteTodo } from "../api";

function TodoItem({ todo, removeTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // const deleteTodo = useDeleteTodo();
  // const handleDelete = () => {
  //   deleteTodo(todo.id);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };
  // const dispatch = useDispatch();
  // const removeTodo = () => {
  //   dispatch(deleteTodo({ id: id }));
  // };
  // const updateTodo = () => {
  //   dispatch(editTodo({ id: id }));
  // };

  return (
    <List.Item>
      <div className="list-item">
        <Checkbox></Checkbox>
        <div className="input-item">
          {isEditing ? (
            <Input value={todo.text}></Input>
          ) : (
            <Typography level={2}>{todo.text}</Typography>
          )}
        </div>

        <div className="todo-item-buttons">
          <Button
            type="primary"
            icon={<PencilIcon strokeWidth={2} height={20} width={20} />}
            onClick={handleEdit}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<TrashIcon strokeWidth={2} height={20} width={20} />}
          ></Button>
        </div>
      </div>
    </List.Item>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
