import { IconButton } from "@mui/material";
import classnames from "classnames";
import { EditorState, RichUtils } from "draft-js";
import React, { useCallback, useMemo } from "react";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import CodeIcon from "@mui/icons-material/Code";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";

interface CreateInlineStyleButtonProp {
  style: string;
  children: React.ReactNode;
}

export interface InlineStyleButtonProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => unknown;
}

function createInlineStyleButton({
  style,
  children,
}: CreateInlineStyleButtonProp): React.FC<InlineStyleButtonProps> {
  return function InlineStyleButton(props) {
    const { editorState, setEditorState } = props;

    const toggleStyle = useCallback(
      (event: React.MouseEvent): void => {
        event.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
      },
      [editorState, setEditorState]
    );

    const preventBubblingUp = useCallback(
      (e: React.MouseEvent) => e.preventDefault(),
      []
    );

    const styleIsActive = useMemo(
      () => editorState.getCurrentInlineStyle().has(style),
      [editorState]
    );

    const classes = classnames(
      "btn btn-sm",
      styleIsActive ? "btn-success" : "btn-info"
    );

    return (
      <button
        className={classes}
        onClick={toggleStyle}
        type="button"
        children={children}
        onMouseDown={preventBubblingUp}
      />
    );
  };
}

export const BoldButton = createInlineStyleButton({
  style: "BOLD",
  children: (
    <IconButton>
      <FormatBoldIcon />
    </IconButton>
  ),
});
export const ItalicButton = createInlineStyleButton({
  style: "ITALIC",
  children: (
    <IconButton>
      <FormatItalicIcon />
    </IconButton>
  ),
});
export const UnderlineButton = createInlineStyleButton({
  style: "UNDERLINE",
  children: (
    <IconButton>
      <FormatUnderlinedIcon />
    </IconButton>
  ),
});
export const CodeButton = createInlineStyleButton({
  style: "CODE",
  children: (
    <IconButton>
      <CodeIcon />
    </IconButton>
  ),
});
export const StrikethroughButton = createInlineStyleButton({
  style: "STRIKETHROUGH",
  children: (
    <IconButton>
      <FormatStrikethroughIcon />
    </IconButton>
  ),
});
