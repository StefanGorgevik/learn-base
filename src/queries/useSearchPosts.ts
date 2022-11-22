import { useQuery, UseQueryResult } from "react-query";
import { useCurrentCollection } from "../contexts/MainContext";
import { SearchItemProps } from "../types/firebase";
import { searchPosts } from "../utils";
import { getIdFromName } from "../utils/utils";

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
