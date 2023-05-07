import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/todosSlice";
import PropTypes from "prop-types";

import {
  Popconfirm,
  Button,
  List,
  Checkbox,
  Typography,
  message,
  Input,
  Form,
} from "antd";
import { PencilIcon } from "@heroicons/react/24/solid";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

function TodoItem({ _id, text, checked }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteTodo(_id));
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveMode = () => {
    setIsEditing(!isEditing);
    dispatch(updateTodo({ id: _id, text: form.getFieldValue("item-input") }));
    if (isEditing) {
      message.success("Todo edited!");
    }
  };

  // const handleUpdate = ({ id, text }) => {
  //   const newValue = form.getFieldValue("item-input");
  //   dispatch(updateTodo({ id, text }));
  //   console.log(newValue, "newValue");
  // };

  // const onFinish = () => {
  //   // здесь формируется объект с текстом задачи
  //   handleUpdate({
  //     _id: _id,
  //     text: form.getFieldValue("item-input"),
  //   });
  //   form.resetFields();
  // };

  // const handleCheck = () => {
  //   dispatch(updateTodo({
  //     checked: !checked,
  //   }));
  // };

  const className = checked ? "checked-style" : "unchecked-style";

  const onChange = (e) => {
    dispatch(updateTodo({ id: _id, checked: e.target.checked }));
    if (checked) {
      message.warning("Todo undone!");
    } else {
      message.success("Todo done!");
    }
  };

  return (
    <div className={className}>
      <List.Item>
        <Checkbox defaultChecked={checked} onChange={onChange}></Checkbox>
        <div className="input-item">
          {isEditing ? (
            <Form className="list-item" form={form}>
              <Form.Item className="form-item-hello" name={"item-input"}>
                <Input type="text" defaultValue={text} maxLength={68}></Input>
              </Form.Item>
            </Form>
          ) : (
            <Typography level={2}>{text}</Typography>
          )}
        </div>
        <div className="todo-item-buttons">
          {isEditing ? (
            <Button
              type="primary"
              icon={<CheckIcon strokeWidth={2} height={20} width={20} />}
              onClick={() => {
                handleSaveMode();
              }}
            ></Button>
          ) : (
            <Button
              type="primary"
              icon={<PencilIcon strokeWidth={2} height={20} width={20} />}
              onClick={() => {
                handleEditMode();
              }}
            ></Button>
          )}
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
      </List.Item>
    </div>
  );
}

TodoItem.propTypes = {
  _id: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
};

export default TodoItem;
