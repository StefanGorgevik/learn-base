import { useQuery } from "react-query";

const getPost = async (id: string) => {
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/main-posts/${id}`
    );
    const result = await response.json();
    return {
      category: result.fields.category.stringValue,
      title: result.fields.title.stringValue,
      description: result.fields.description.stringValue,
      contents: JSON.parse(result.fields.contents.stringValue),
      name: result.name,
      keywords: result?.fields?.keywords?.stringValue
        ? JSON.parse(result.fields.keywords.stringValue)
        : [],
    };
  } catch (e) {
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
      return result;
    },
  });
};
