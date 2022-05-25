import { useQuery } from "react-query";

const getPosts = async () => {
  const response = await fetch(
    "https://learn-base-86d03-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
  );
  const result = await response.json();
  console.log(result);

  return result;
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const result = await getPosts();
      let array: any = [];
      Object.keys(result).forEach((key) => {
        array.push({ ...result[key], id: key });
      });
      return array;
    },
  });
};
