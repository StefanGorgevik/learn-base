import "draft-js/dist/Draft.css";

import {
  ContentBlock,
  convertFromRaw,
  Editor,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import React, { useMemo } from "react";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

function customBlockStyleFn(contentBlock: ContentBlock) {
  const alignment = contentBlock.getData().get("alignment", "default");
  if (alignment === "left") {
    return "flex justify-start";
  } else if (alignment === "center") {
    return "flex justify-center";
  } else if (alignment === "right") {
    return "flex justify-end";
  }
  return "";
}

interface DraftEditorProps {
  value: RawDraftContentState;
}

export const Prose: React.FC<DraftEditorProps> = (props) => {
  const { value } = props;
  const editorState = useMemo(
    () => EditorState.createWithContent(convertFromRaw(value)),
    [value]
  );

  return (
    <Editor
      blockStyleFn={customBlockStyleFn}
      customStyleMap={styleMap}
      editorState={editorState}
      onChange={() => null}
      readOnly
    />
  );
};
