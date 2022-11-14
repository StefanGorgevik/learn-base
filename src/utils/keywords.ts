import { Keyword } from "../types";
import { StringValueProps } from "../types/firebase";

export const transformKeywords = (keywords: Keyword[]) => {
  return {
    arrayValue: {
      values: keywords.map((keyword) => ({
        stringValue: keyword,
      })),
    },
  };
};

export const getKeywordsFromResponse = (
  keywords: StringValueProps[]
): string[] => {
  return keywords.map((item) => item.stringValue);
};
