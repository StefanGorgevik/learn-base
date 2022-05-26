import { useQuery } from "react-query";

const getPost = async (id: string) => {
  try {
    const response = await fetch(
      `https://learn-base-86d03-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
    const result = await response.json();
    console.log("RESULT,", result);
    return result;
  } catch (e) {
    console.log("res", e);
    throw new Error("Error occurred!");
  }
};

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const result = await getPost(id);
      console.log("result USE GET POST", result);
      return result;
    },
  });
};
