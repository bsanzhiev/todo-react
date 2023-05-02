import PropTypes from "prop-types";

import { useState } from "react";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
// import { useCreateTodo, useUpdateTodo } from "../api";

// import PropTypes from "prop-types";

// Temp code to simulate a todo being passed in
// import { useDispatch } from "react-redux";
// import { addTodo } from "../store/localTodosSlice";

const TodoForm = ({ addTodo }) => {
  // const [text, setText] = useState(todo ? todo.text : "");
  // const createTodo = useCreateTodo();
  // const updateTodo = useUpdateTodo();
  // const [todos, setTodos] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (todo) {
  //     updateTodo({
  //       id: todo.id,
  //       text,
  //     });
  //   } else {
  //     createTodo({ text });
  //   }
  //   setText("");
  // };

  // Temp code to simulate a todo being passed in
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();
  // const [todo, setTodo] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    // dispatch(addTodo({ text: value }));
    addTodo({
      id: Date.now(),
      text: value,
      completed: false,
    });
    setValue("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addTodo({
  //     id: Date.now(),
  //     text,
  //     completed: false,
  //   });
  //   setText("");
  // };

  // const handleChange = (e) => {
  //   setText(e.target.value);
  // };

  return (
    <Form className="todo-form-hello" layout="horizontal" size="large">
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={19}>
          <Form.Item
            name="todo-input-form"
            // rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="What needs to be done?"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={5}>
          <Button type="primary" htmlType="submit" onClick={onSubmit} block>
            <PlusCircleFilled />
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
