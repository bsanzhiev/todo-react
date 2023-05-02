import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch } from "react-redux";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./store/todosSlice";

import PropTypes from "prop-types";

const queryClient = new QueryClient();

export function useGetTodos() {
  const dispatch = useDispatch();
  return () => {
    queryClient.fetchQuery("todos", () => dispatch(fetchTodos()), {
      staleTime: 1000 * 60 * 5, // 5 minutes)
    });
  };
}

export function useCreateTodo() {
  const dispatch = useDispatch();
  return () => {
    queryClient.mutate("createTodo", (text) => dispatch(createTodo(text)), {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    });
  };
}

export function useUpdateTodo() {
  const dispatch = useDispatch();
  return () => {
    queryClient.mutate(
      "updateTodo",
      ({ id, text }) => dispatch(updateTodo({ id, text })),
      {
        onSuccess: () => queryClient.invalidateQueries("todos"),
      }
    );
  };
}

export function useDeleteTodo() {
  const dispatch = useDispatch();
  return () => {
    queryClient.mutate("deleteTodo", (id) => dispatch(deleteTodo(id)), {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    });
  };
}

export function ApiProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
