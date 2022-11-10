import { AllEditorContentsProps } from "./editorTypes";
import { Keyword } from "./keywords";

export interface PostProps {
  title: string;
  description: string;
  keywords: Keyword[];
  category: string;
  contents?: AllEditorContentsProps[];
  id?: string;
}
