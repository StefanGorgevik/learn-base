import "draft-js/dist/Draft.css";

import { usePreviousValue } from "beautiful-react-hooks";
import { ContentBlock, ContentState, Editor, EditorState } from "draft-js";
import * as Immutable from "immutable";
import React, { useEffect, useMemo, useState } from "react";

import {
  BlockquoteButton,
  H1Button,
  H2Button,
  H3Button,
  H4Button,
  UnorderedListButton,
} from "./blockButtons";
import { customBlockRenderer } from "./blockRenderer";
import { decorators } from "./decorators";
import {
  BoldButton,
  CodeButton,
  ItalicButton,
  StrikethroughButton,
  UnderlineButton,
} from "./inlineButtons";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

export interface DraftEditorProps {
  defaultValue?: ContentState;
  onChange: (value: ContentState) => unknown;
  onBlur?: () => unknown;
  editorState: any;
  setEditorState: any;
}

export const DraftEditor: React.FC<DraftEditorProps> = (props) => {
  const { onChange, onBlur, editorState, setEditorState } = props;

  const prevState = usePreviousValue(editorState);

  useEffect(() => {
    if (!Immutable.is(prevState, editorState)) {
      onChange(editorState.getCurrentContent());
    }
  }, [editorState, onChange, prevState]);

  const styleButtonProps = useMemo(
    () => ({ editorState, setEditorState }),
    [editorState, setEditorState]
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 1,
          padding: 5,
        }}
      >
        <BoldButton {...styleButtonProps} />
        <ItalicButton {...styleButtonProps} />
        <UnderlineButton {...styleButtonProps} />
        <CodeButton {...styleButtonProps} />
        <StrikethroughButton {...styleButtonProps} />
        <H1Button {...styleButtonProps} />
        <H2Button {...styleButtonProps} />
        <H3Button {...styleButtonProps} />
        <H4Button {...styleButtonProps} />
        <BlockquoteButton {...styleButtonProps} />
        <UnorderedListButton {...styleButtonProps} />
      </div>
      <div style={{ padding: 15 }}>
        <Editor
          blockRendererFn={customBlockRenderer}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={setEditorState}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
