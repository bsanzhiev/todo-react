import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTodoAPI,
  deleteTodoAPI,
  fetchTodosAPI,
  updateTodoAPI,
} from "../api/todoAPI";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetchTodosAPI();
  return response.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (text) => {
  const response = await (addTodoAPI, text);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodos",
  async ({ id, text }) => {
    const response = await updateTodoAPI(`/todos/${id}`, { text });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodos", async (id) => {
  await deleteTodoAPI(`/todos/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
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
        state.todos.push(action.payload);
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
        const { id } = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
