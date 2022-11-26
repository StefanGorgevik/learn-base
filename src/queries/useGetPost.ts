import { useQuery, UseQueryResult } from "react-query";
import { PostProps } from "../types";
import { getPost } from "../utils";

export const useGetPost = (
  id: string,
  currentCollection: string
): UseQueryResult<PostProps> => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const result = await getPost(id, currentCollection);
      return result;
    },
  });
};
