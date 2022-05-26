import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { PostProps } from "../types";

const updatePost = async (postData: PostProps) => {
  const id = postData.id;
  delete postData.id;
  const response = await fetch(
    `https://learn-base-86d03-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(postData),
    }
  );

  const result = await response.json();
  return result;
};

export const useUpdatePost = (): UseMutateFunction<
  unknown,
  unknown,
  PostProps,
  unknown
> => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (postData: PostProps) => {
      return await updatePost(postData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  return mutate;
};
