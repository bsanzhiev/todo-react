import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addTodoAPI,
  deleteTodoAPI,
  fetchTodosAPI,
  updateTodoAPI,
} from "../api/todoAPI";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "https://todo-node-dhcf.onrender.com/";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${BASE_URL}todos`);
  return response.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (text) => {
  const response = await axios.post(`${BASE_URL}todos/`, text);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodos",
  async ({ id, text }) => {
    const response = await updateTodoAPI(`/todos/${id}`, { text });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`${BASE_URL}todos/${id}`);
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "succeeded",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // createTodo
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, text } = action.payload;
        const existingTodo = state.todos.find((todo) => todo.id === id);
        if (existingTodo) {
          existingTodo.text = text;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // deleteTodo
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const todoId = action.payload;
        // state.items = state.items.filter((item) => item._id !== todoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
