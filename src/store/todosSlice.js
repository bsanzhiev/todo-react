import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://todo-node-dhcf.onrender.com/";

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
  async ({ id, text, checked }) => {
    const response = await axios.put(`${BASE_URL}todos/${id}`, { text, checked });
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
    searchTerm: "",
    filteredItems: [],
  },
  reducers: {
    filterTodos: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;
      state.filteredItems = state.items.filter((task) =>
        task.text.toLowerCase().includes(searchTerm)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
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
        const updatedTodo = action.payload;
        const updatedTodos = state.items.map((todo) => {
          if (todo._id === updatedTodo._id) {
            return updatedTodo;
          }
          return todo;
        });
        state.items = updatedTodos;
        state.status = "succeeded";
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
        state.status = "succeeded";
        const todoId = action.payload;
        state.items = state.items.filter((item) => item._id !== todoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterTodos } = todosSlice.actions;
export default todosSlice.reducer;
