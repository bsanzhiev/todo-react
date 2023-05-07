import { useDispatch } from "react-redux";
import { createTodo, filterTodos } from "../store/todosSlice";

import { Form, Row, Col, Button, Input, message } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";



// const onChange = (e) => console.log(e.target.value);

const TodoForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFormSubmit = (text) => {
    dispatch(createTodo(text));
    message.success("Todo added!");
  };
  const onFinish = () => {
    // здесь формируется объект с текстом задачи
    handleFormSubmit({
      text: form.getFieldValue("name"),
    });
    form.resetFields();
  };

  const handleFilter = () => {
    // const value = e.target.value.toLowerCase();
    // const filter = todos.filter((todo) => {
    //   return todo.text.toLowerCase().includes(value);
    // });
    dispatch(filterTodos(form.getFieldValue("name")));
    // form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="todo-form-hello"
      layout="horizontal"
      size="large"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={19}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              onChange={handleFilter}
              type="text"
              placeholder="Юу хийх шаардлагатай вэ?"
              maxLength={60}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={5}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
