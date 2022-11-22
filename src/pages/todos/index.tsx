import { Grid } from "@mui/material";
import React, { useState } from "react";
import { TodosForm } from "../../components/todoComponents/todosForm";

import { TodosList } from "../../components/todoComponents/todosList";
import { TodoProps } from "../../types/todos";
export const initTodo: TodoProps = {
  id: "",
  title: "",
  description: "",
  level: "",
  completed: false,
  category: "",
};
export const Todos: React.FC = () => {
  const [currentTodo, setCurrentTodo] = useState<TodoProps>(initTodo);
  return (
    <Grid container spacing={3} padding={5} justifyContent='center'>
      <TodosList currentTodo={currentTodo} setCurrentTodo={setCurrentTodo}/>
      <TodosForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo}/>
    </Grid>
  );
};
