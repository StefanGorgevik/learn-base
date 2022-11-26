import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
  useQuery,
} from "react-query";
import { TodoProps } from "../types";
import { deleteTodo, getTodos, updateTodo, saveTodo } from "../utils";
import { getIdFromName } from "../utils/utils";

export const useSaveTodo = (): UseMutateFunction<
  unknown,
  unknown,
  TodoProps,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (todoData: TodoProps) => {
      return await saveTodo(todoData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  return mutate;
};

export const useTodos = (completed: string) => {
  const { data: result, isLoading } = useQuery({
    queryKey: ["todos", completed],
    queryFn: async () => await getTodos(completed),
  });

  let array: TodoProps[] = [];
  if (result) {
    result?.forEach((item: any) => {
      if (item?.document) {
        array.push({
          category: item.document.fields.category.stringValue,
          title: item.document.fields.title.stringValue,
          description: item.document.fields.description.stringValue,
          level: item.document.fields.level.stringValue,
          id: getIdFromName(item.document.name),
          completed: item.document.fields.completed.booleanValue,
        });
      }
    });
  }
  return { data: array, isLoading };
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(async (id: string) => await deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export const useUpdateTodo = (): UseMutateFunction<
  unknown,
  unknown,
  TodoProps,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (todoData: TodoProps) => {
      return await updateTodo(todoData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  return mutate;
};
