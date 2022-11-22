import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTodo, useTodos, useUpdateTodo } from "../../../queries";
import { TodoProps, TodosAppliedFilterTypes } from "../../../types";
import { initTodo } from "../../../pages/todos";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { TodosStatusTabs } from "../todosStatusTabs";
interface TodoListProps {
  currentTodo: TodoProps;
  setCurrentTodo: (todo: TodoProps) => void;
}

export const TodosList: React.FC<TodoListProps> = ({
  currentTodo,
  setCurrentTodo,
}) => {
  const theme = useTheme();
  const [appliedFilter, setAppliedFilter] =
    useState<TodosAppliedFilterTypes>("all");
  const { data: todos, isLoading } = useTodos(appliedFilter);
  const { mutate } = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const onCompleteChange = (todoItem: TodoProps) => {
    console.log("todoItem", todoItem);
    updateTodo({
      ...todoItem,
      completed: !todoItem.completed,
    });
  };

  console.log("todos", todos);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style, data } = props;
    console.log("props", data);
    const item = data[index];

    return (
      <ListItem
        style={{
          ...style,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: currentTodo?.id === item.id ? "#465063" : "inherit",
          borderRadius: theme.shape.borderRadius,
          paddingRight: 25,
          textDecoration: item.completed ? "line-through" : "",
          textDecorationColor: "white",
        }}
        key={index}
        component="div"
        disablePadding
      >
        <Box>
          <ListItemButton>
            <ListItemText primary={item.title} sx={{ color: "white" }} />
          </ListItemButton>
        </Box>
        <Box sx={{ display: "flex", width: "25%", alignItems: "center" }}>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: "white" }}
              onClick={() => setCurrentTodo(item)}
            >
              <EditIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: "#A52A2A" }}
              onClick={() => mutate(item.id)}
            >
              <DeleteIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: "white" }}
              onClick={() => onCompleteChange(item)}
            >
              {!item.completed ? (
                <CheckCircleOutlineIcon />
              ) : (
                <CheckCircleRoundedIcon />
              )}
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </ListItem>
    );
  };

  return (
    <Box>
      <TodosStatusTabs setAppliedFilter={setAppliedFilter} />
      <Box
        sx={{
          width: 500,
          bgcolor: theme?.palette.primary.main,
          height: "100%",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        {todos?.length !== 0 && !isLoading ? (
          <FixedSizeList
            height={400}
            width="100%"
            itemSize={46}
            itemCount={todos.length}
            itemData={todos}
            overscanCount={5}
            style={{
              height: "100%",
            }}
          >
            {renderRow}
          </FixedSizeList>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: 5,
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h5" color="secondary">
                No items found!
              </Typography>
            )}
          </Box>
        )}
        {currentTodo?.id && <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 2.3,
          }}
        >
          <Button
            variant="contained"
            type="button"
            onClick={() => {
              setCurrentTodo(initTodo);
            }}
          >
            Add New Todo
          </Button>
        </Box>}
      </Box>
    </Box>
  );
};
