import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../types";
import { transformKeywords } from "../utils/keywords";

const savePost = async (postData: PostProps) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${postData.category}/`,
    {
      method: "POST",
      body: JSON.stringify({
        fields: {
          title: { stringValue: postData.title },
          description: { stringValue: postData.description },
          contents: { stringValue: JSON.stringify(postData.contents) },
          category: { stringValue: postData.category },
          keywords: transformKeywords(postData.keywords),
        },
      }),
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
