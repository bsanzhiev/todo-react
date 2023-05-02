import axios from "axios";

const API_URL = "http://localhost:8080";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export const getTodos = () => {
  return instance.get("todos");
}

export const addTodo = (todo) => {
  return instance.post("todos", todo);
}

export const updateTodo = (todo) => {
  return instance.put("todos", todo);
}

export const deleteTodo = (id) => {
  return instance.delete(`todos/${id}`);
}

// Path: src/components/TodoList.js
