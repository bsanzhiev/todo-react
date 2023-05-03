import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { ApiProvider } from "./api";
// import todosReducer from "./store/todosSlice";
import todosReducer from "./store/todosSlice";
// import Todos from "./components/Todos";
import "./App.css";
import TodosContainer from "./components/TodosContainer";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <>
        <TodosContainer />
      </>
    </Provider>
  );
}

export default App;
