import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todosSlice";
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


function TodoItem({ text, checked }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(!isEditing);
    updateTodo();
  };

  return (
    <List.Item>
      <div className="list-item">
        <Checkbox checked={checked}></Checkbox>
        <div className="input-item">
          {isEditing ? (
            <Input value={text}></Input>
          ) : (
            <Typography level={2}>{text}</Typography>
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
            onClick={deleteTodo()}
            icon={<TrashIcon strokeWidth={2} height={20} width={20} />}
          ></Button>
        </div>
      </div>
    </List.Item>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default TodoItem;
