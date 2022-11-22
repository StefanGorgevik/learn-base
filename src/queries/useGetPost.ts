import { useQuery } from "react-query";
import { getPost } from "../utils";

export const useGetPost = (id: string, currentCollection: string) => {
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
