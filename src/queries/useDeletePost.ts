import { useMutation, useQueryClient } from "react-query";

const deletePost = async (id: string) => {
  try {
    return await fetch(
      `https://learn-base-86d03-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
      { method: "DELETE" }
    );
  } catch (e) {
    return false;
  }
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      return await deletePost(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
};
