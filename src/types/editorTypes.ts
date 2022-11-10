import { EditorState, RawDraftContentState} from "draft-js";

export interface ParagraphStylesProps {
  id: string;
  formatType: string;
}

export interface GistDataProps {
  url?: string;
  name?: string;
}

export interface EditorStateProps {
  id: string;
  editorState: EditorState;
  gistData: GistDataProps;
  editorStateName: string;
}

export interface AllEditorContentsProps {
  id: string;
  editorState: RawDraftContentState;
  gistData: GistDataProps;
  editorStateName: string;
}