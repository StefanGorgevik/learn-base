import { TodoProps } from "../types";

export const getTodos = async (completed: string) => {
  let isCompleted: boolean | undefined = false;
  let options: { method: string; body?: any } | undefined = {
    method: "POST",
  };

  const query: any = {
    structuredQuery: {
      from: [{ collectionId: "todos" }],
    },
  };
  switch (completed) {
    case "all":
      isCompleted = undefined;
      options["body"] = JSON.stringify(query);

      break;
    case "completed":
      isCompleted = true;
      query.structuredQuery["where"] = {
        fieldFilter: {
          field: {
            fieldPath: "completed",
          },
          op: "EQUAL",
          value: {
            booleanValue: isCompleted,
          },
        },
      };
      options["body"] = JSON.stringify(query);

      break;
    case "uncompleted":
      query.structuredQuery["where"] = {
        fieldFilter: {
          field: {
            fieldPath: "completed",
          },
          op: "EQUAL",
          value: {
            booleanValue: isCompleted,
          },
        },
      };
      options["body"] = JSON.stringify(query);
      isCompleted = false;
      break;

    default:
      isCompleted = false;
      break;
  }

  const url = `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents:runQuery`;
  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};

export const deleteTodo = async (id: string) => {
  try {
    return await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/todos/${id}`,
      { method: "DELETE" }
    );
  } catch (e) {
    return false;
  }
};

export const updateTodo = async (todoData: TodoProps) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/todos/${todoData.id}/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        fields: {
          title: { stringValue: todoData.title },
          description: { stringValue: todoData.description },
          level: { stringValue: todoData.level },
          category: { stringValue: todoData.category },
          completed: { booleanValue: todoData.completed },
        },
      }),
    }
  );

  const result = await response.json();
  return result;
};


export const saveTodo = async (todoData: TodoProps) => {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/todos/`,
      {
        method: "POST",
        body: JSON.stringify({
          fields: {
            title: { stringValue: todoData.title },
            description: { stringValue: todoData.description },
            level: { stringValue: todoData.level },
            category: { stringValue: todoData.category },
            completed: { booleanValue: todoData.completed },
          },
        }),
      }
    );
  
    const result = await response.json();
    return result;
  };