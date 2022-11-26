import {
  Box,
  Button,
  CircularProgress,
  Card,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";

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
    updateTodo({
      ...todoItem,
      completed: !todoItem.completed,
    });
  };

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style, data } = props;
    const item = data[index];

    return (
      <ListItem
        style={{
          ...style,
          marginTop: 15,
          borderRadius: theme.shape.borderRadius,
          paddingRight: 25,
          textDecoration: item.completed ? "line-through" : "",
          textDecorationColor: "black",
          marginLeft: 10,
        }}
        key={index}
        component="div"
        disablePadding
      >
        <Card
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor:
              currentTodo?.id === item.id
                ? theme?.palette.primary.light
                : "inherit",
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <ListItemButton sx={{ borderRadius: theme.shape.borderRadius }}>
              <ListItemText primary={item.title} sx={{ color: "black" }} />
            </ListItemButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ListItemButton sx={{ borderRadius: theme.shape.borderRadius }}>
              <ListItemIcon
                sx={{ color: "black", minWidth: 0 }}
                onClick={() => setCurrentTodo(item)}
              >
                <EditIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton sx={{ borderRadius: theme.shape.borderRadius }}>
              <ListItemIcon
                sx={{ color: "#A52A2A", minWidth: 0 }}
                onClick={() => mutate(item.id)}
              >
                <DeleteIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton sx={{ borderRadius: theme.shape.borderRadius }}>
              <ListItemIcon
                sx={{ color: "black", minWidth: 0 }}
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
        </Card>
      </ListItem>
    );
  };

  return (
    <Box>
      <TodosStatusTabs setAppliedFilter={setAppliedFilter} />
      <Box
        sx={{
          width: 500,
          height: "100%",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        {todos?.length !== 0 && !isLoading ? (
          <FixedSizeList
            height={500}
            width="100%"
            itemSize={60}
            itemCount={todos.length}
            itemData={todos}
            overscanCount={5}
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
              <Typography variant="h5" color="primary">
                No items found!
              </Typography>
            )}
          </Box>
        )}
        {currentTodo?.id && (
          <Box
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
          </Box>
        )}
      </Box>
    </Box>
  );
};
