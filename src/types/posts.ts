import { KeywordProps } from "./keywords";

export interface PostProps {
  title: string;
  description: string;
  keywords: KeywordProps[];
  category: string;
  id?: string;
}
