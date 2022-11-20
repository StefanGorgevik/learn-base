import { AllEditorContentsProps } from "./editorTypes";
import { Keyword } from "./keywords";

export interface PostProps {
  title: string;
  description: string;
  category: string;
  keywords: Keyword[];
  contents?: AllEditorContentsProps[];
  id?: string;
  name?:string;
  createTime?:string;
}
