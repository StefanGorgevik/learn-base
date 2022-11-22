import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { PostProps } from "../types";
import { updatePost } from "../utils";

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
