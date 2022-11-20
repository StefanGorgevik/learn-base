import { useQuery } from "react-query";
import { PostProps } from "../types";
import { PostsResponseProps } from "../types/firebase";
import { getIdFromName } from "../utils/utils";

const getPosts = async (currentCollection: string) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${currentCollection}/`
  );
  const result = await response.json();

  return result;
};

export const useGetPosts = (currentCollection: string) => {
  const { data: result, isLoading } = useQuery({
    queryKey: ["posts", currentCollection],
    queryFn: async () => await getPosts(currentCollection),
  });

  let array: PostProps[] = [];
  if (result?.documents) {
    result?.documents.forEach((item: PostsResponseProps) =>
      array.push({
        category: item.fields.category.stringValue,
        title: item.fields.title.stringValue,
        description: item.fields.description.stringValue,
        name: item.name,
        id: getIdFromName(item.name),
        createTime: item.createTime,
        keywords: [],
      })
    );
  }
  return { data: array, isLoading };
};
