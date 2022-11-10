import { useQuery } from "react-query";

const getPosts = async () => {
  const response = await fetch(
    "https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/main-posts/"
  );
  const result = await response.json();

  return result;
};

interface ResponsePostProps {
  category: {
    stringValue: string;
  };
  description: {
    stringValue: string;
  };
  title: {
    stringValue: string;
  };
  contents: {
    stringValue: string;
  };
}
interface PostsResponseProps {
  name: string;
  createTime: string;
  updateTime: string;
  fields: ResponsePostProps;
}

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const result = await getPosts();
      let array: any = [];
      if (result?.documents) {
        result?.documents.forEach((item: PostsResponseProps) =>
          array.push({
            category: item.fields.category.stringValue,
            title: item.fields.title.stringValue,
            description: item?.fields.description.stringValue,
            contents: JSON.parse(item?.fields.contents.stringValue),
            name: item.name,
          })
        );
      }
      return array;
    },
  });
};
