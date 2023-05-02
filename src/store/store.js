import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./localTodosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
