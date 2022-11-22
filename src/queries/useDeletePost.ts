import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../utils";

export const useDeletePost = (currentCollection: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => await deletePost(id, currentCollection),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
};
