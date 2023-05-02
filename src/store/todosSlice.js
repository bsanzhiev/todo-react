import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:8080/todos');
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
  initialState: {
    items: [
      {
        id: 1,
        text: 'Learn React',
        completed: true,
      },
    ],
    status: 'idle',
    error: null,
  },
  reducers: {},
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

export default todosSlice.reducer;
