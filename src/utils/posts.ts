import { PostProps } from "../types";
import { getKeywordsFromResponse, transformKeywords } from "./keywords";

export const getPosts = async (currentCollection: string) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${currentCollection}/`
  );
  const result = await response.json();

  return result;
};

export const getPost = async (id: string, currentCollection: string) => {
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${currentCollection}/${id}`
    );
    const result = await response.json();
    return {
      category: result.fields.category.stringValue,
      title: result.fields.title.stringValue,
      description: result.fields.description.stringValue,
      contents: JSON.parse(result.fields.contents.stringValue),
      name: result.name,
      keywords: result?.fields?.keywords?.arrayValue?.values
        ? getKeywordsFromResponse(result.fields.keywords.arrayValue.values)
        : [],
    };
  } catch (e) {
    throw new Error("Error occurred!");
  }
};

export const savePost = async (postData: PostProps) => {
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

export const searchPosts = async (
  search: string,
  currentCollection: string
) => {
  if (!search) return null;
  const query = {
    structuredQuery: {
      where: {
        fieldFilter: {
          field: {
            fieldPath: "keywords",
          },
          op: "ARRAY_CONTAINS_ANY",
          value: {
            arrayValue: {
              values: [{ stringValue: search }],
            },
          },
        },
      },
      from: [{ collectionId: currentCollection }],
    },
  };
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents:runQuery`,
    { method: "POST", body: JSON.stringify(query) }
  );
  const result = await response.json();

  return result;
};

export const updatePost = async (postData: PostProps) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${postData.category}/${postData.id}`,
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

export const deletePost = async (id: string, currentCollection: string) => {
  try {
    return await fetch(
      `https://firestore.googleapis.com/v1/projects/learn-base-86d03/databases/(default)/documents/${currentCollection}/${id}`,
      { method: "DELETE" }
    );
  } catch (e) {
    return false;
  }
};
