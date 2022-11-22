import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../types";
import { savePost } from "../utils";

export const useSavePost = (): UseMutateFunction<
  unknown,
  unknown,
  PostProps,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    async (postData: PostProps) => {
      return await savePost(postData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        navigate("/");
      },
    }
  );

  return mutate;
};
