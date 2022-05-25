import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, useTheme } from "@mui/material";
import { ParagraphStylesProps } from "../../types";

const STYLES: ParagraphStylesProps[] = [
  { id: "bold", formatType: "BOLD" },
  { id: "italic", formatType: "ITALIC" },
  { id: "underline", formatType: "UNDERLINE" },
];

export const ContentEditor: React.FC = () => {
  const theme = useTheme();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleStyleClick = (e: any, formatType: string) => {
    e.preventDefault();
    const nextState = RichUtils.toggleInlineStyle(editorState, formatType);
    console.log("NEXT STATE", nextState);
    console.log(editorState.getCurrentContent().getBlocksAsArray());
    setEditorState(nextState);
  };

  return (
    <div
      style={{
        width: "70%",
        background: theme?.palette.primary.light,
      }}
    >
      <div
        style={{
          borderBottom: `1px solid ${theme?.palette.primary.dark}`,
        }}
      >
        {STYLES.map(({ formatType, id }) => (
          <Button
            key={id}
            onMouseDown={(e: any) => handleStyleClick(e, formatType)}
          >
            {id.toUpperCase()}
          </Button>
        ))}
      </div>
      <div
        style={{
          padding: "1em",
          minHeight: "100%",
          height: "100%",
        }}
      >
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};
