import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { PostProps } from "../types";
import { transformKeywords } from "../utils/keywords";

const updatePost = async (postData: PostProps) => {
  const id = postData.id;
  delete postData.id;
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${postData.category}/${id}`,
    {
      method: "PATCH",
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
