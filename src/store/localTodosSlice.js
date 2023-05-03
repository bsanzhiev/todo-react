import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {fetchTodosAPI} from '../api/todoAPI';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('fetchTodosAPI');
  return response.data;
});

export const createTodo = createAsyncThunk('todos/createTodos', async (text) => {
  const response = await axios.post('http://localhost:8080/todos', { text });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodos', async ({ id, text }) => {
  const response = await axios.put(`/todos/${id}`, { text });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodos', async (id) => {
  await axios.delete(`/todos/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  // initialState: {
  //   items: [],
  //   status: 'idle',
  //   error: null,
  // },
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      };
      state.push(todo);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      // let { todoList } = state;
      return state.map((item) => 
        item.id === action.payload.id ? action.payload : item);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    })
    .addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    .addCase(createTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    })
    .addCase(deleteTodo.fulfilled, (state, action) => {
      const { id } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    });
  },
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
