import React, { useEffect, useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Grid,
  Button,
  Box,
} from "@mui/material";

import { SelectCategoryInput } from "../../selectCategoryInput";
import { useSaveTodo, useUpdateTodo } from "../../../queries";
import { TodoProps } from "../../../types/todos";
import { initTodo } from "../../../pages/todos";
import { SelectLevelInput } from "../../selectLevelInput";

interface TodosFormProps {
  currentTodo: TodoProps;
  setCurrentTodo: (todo: TodoProps) => void;
}
export const TodosForm: React.FC<TodosFormProps> = ({
  currentTodo,
  setCurrentTodo,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("javascript");
  const [level, setLevel] = useState<string>("all levels");
  const saveTodo = useSaveTodo();
  const updateTodo = useUpdateTodo();

  useEffect(() => {
    if (currentTodo?.id) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
      setCategory(currentTodo.category);
      setLevel(currentTodo.level);
    } else {
      resetForm();
    }
  }, [currentTodo]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setLevel("");
  };

  const submit = () => {
    const newTodo = {
      title,
      description,
      category,
      level,
      id: "",
      completed: false,
    };
    if (currentTodo?.id) {
      newTodo.id = currentTodo.id;
      newTodo.completed = currentTodo.completed;
      updateTodo(newTodo);
    } else {
      saveTodo(newTodo);
    }
    console.log("HERE");
    setCurrentTodo(initTodo);
    resetForm();
  };

  return (
    <Grid sx={{ padding: 5 }}>
      <Box>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            style={{
              width: "300px",
              maxWidth: "300px",
              display: "flex",
              gap: "1.5em",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <SelectCategoryInput
              category={category}
              onCategoryChange={setCategory}
            />
            <TextareaAutosize
              className="textArea"
              maxRows={10}
              aria-label="description"
              placeholder="Description"
              style={{ height: 200, padding: 10 }}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
            <SelectLevelInput
              level={level}
              onLevelChange={setLevel}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" type="button" onClick={submit}>
              {currentTodo?.id ? "Update" : "Save"} Todo
            </Button>
          </Box>
        </div>
      </Box>
    </Grid>
  );
};
