import { useMutation, useQueryClient } from "react-query";

const deletePost = async (id: string) => {
  try {
    return await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/main-posts/${id}`,
      { method: "DELETE" }
    );
  } catch (e) {
    return false;
  }
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(async (id: string) => await deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
