import { useQuery, UseQueryResult } from "react-query";
import { useCurrentCollection } from "../contexts/MainContext";
import { SearchItemProps } from "../types/firebase";
import { getIdFromName } from "../utils/utils";

const searchPosts = async (search: string, currentCollection: string) => {
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

export const useSearchPosts = (
  search: string
): UseQueryResult<SearchItemProps[]> => {
  const { currentCollection } = useCurrentCollection();
  return useQuery({
    queryKey: ["search-posts", search],
    queryFn: async () => {
      const result = await searchPosts(search, currentCollection);
      let array: { title: string; id: string }[] = [];
      if (result) {
        result?.forEach((item: any) => {
          if (item?.document) {
            array.push({
              title: item.document.fields.title.stringValue,
              id: getIdFromName(item.document.name),
            });
          }
        });
      }
      return array;
    },
  });
};
