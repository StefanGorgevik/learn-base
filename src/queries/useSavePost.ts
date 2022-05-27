import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../types";

const savePost = async (postData: any) => {
  const response = await fetch(
    "https://learn-base-86d03-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
    {
      method: "POST",
      body: JSON.stringify(postData),
    }
  );

  const result = await response.json();
  return result;
};

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
