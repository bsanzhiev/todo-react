import axios from "axios";

const API_URL = "https://todo-node-dhcf.onrender.com/";
// const API_URL = "http://localhost:3000/";

const instance = axios.create({
  baseURL: API_URL,
});

export const fetchTodosAPI = () => {
  return instance.get("todos");
}

export const addTodoAPI = (text) => {
  console.log('text text', text);
  return instance.post(text);
}

export const updateTodoAPI = (todo) => {
  return instance.put("todos", todo);
}

export const deleteTodoAPI = (id) => {
  return instance.delete(`todos/${id}`);
}

// Path: src/components/TodoList.js
