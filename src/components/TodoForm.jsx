import { useDispatch } from "react-redux";
import { createTodo } from "../store/todosSlice";

import { Form, Row, Col, Button, Input, message } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const TodoForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFormSubmit = (name) => {
    dispatch(createTodo(name));
    message.success("Todo added!");
  };
  const onFinish = () => {
    handleFormSubmit({
      name: form.getFieldValue("name"),
    });
    form.resetFields();
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
            <Input placeholder="What needs to be done?" />
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
