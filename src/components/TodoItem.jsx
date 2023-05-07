import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos } from "../store/todosSlice";
import PropTypes from "prop-types";

import { Popconfirm, Button, List, Checkbox, Typography, message } from "antd";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

function TodoItem({ _id, text, checked }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);
  // useEffect(() => {
  //   if (status === "succeeded") {
  //     dispatch(fetchTodos());
  //   }
  // }, [status, dispatch]);

  
  const handleRemove = () => {
    dispatch(deleteTodo(_id));
  };
  
  // const [isEditing, setIsEditing] = useState(false);

  //  const handleEdit = () => {
  //    setIsEditing(!isEditing);
  //    dispatch(updateTodo());
  //  };

  return (
    <List.Item>
      <div className="list-item">
        <Checkbox checked={checked}></Checkbox>
        {/* <div className="input-item">
          {isEditing ? (
            <Input value={text}></Input>
          ) : (
            <Typography level={2}>{text}</Typography>
          )}
        </div> */}
        <div className="input-item">
          <Typography level={2}>{text}</Typography>
        </div>
        <div className="todo-item-buttons">
          <Button
            type="primary"
            icon={<PencilIcon strokeWidth={2} height={20} width={20} />}
          ></Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => {
              handleRemove();
              message.success("Todo deleted successfully!");
            }}
          >
            <Button
              type="primary"
              danger
              icon={<TrashIcon strokeWidth={2} height={20} width={20} />}
            ></Button>
          </Popconfirm>
        </div>
      </div>
    </List.Item>
  );
}

TodoItem.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default TodoItem;
