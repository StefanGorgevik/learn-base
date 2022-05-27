import { IconButton } from "@mui/material";
import { EditorState, RichUtils } from "draft-js";
import React, { useCallback, useMemo } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
interface CreateBlockStyleButtonProps {
  style: string;
  children: React.ReactNode;
}

export interface BlockStyleButtonProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => unknown;
  toggleButton: (button: string) => unknown;
  pressedButtons: string[];
}

function createBlockStyleButton({
  style,
  children,
}: CreateBlockStyleButtonProps): React.FC<BlockStyleButtonProps> {
  return function BlockStyleButton({
    editorState,
    setEditorState,
    pressedButtons,
    toggleButton,
  }) {
    const toggleStyle = useCallback(
      (event: React.MouseEvent): void => {
        event.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, style));
        toggleButton(style);
      },
      [editorState, setEditorState, toggleButton]
    );

    const preventBubblingUp = useCallback(
      (e: React.MouseEvent) => e.preventDefault(),
      []
    );

    const isActive = useMemo(() => {
      const isPressed = pressedButtons.find((b) => style === b);
      return isPressed;
    }, [pressedButtons]);

    return (
      <div
        onClick={toggleStyle}
        onMouseDown={preventBubblingUp}
        style={{
          background: isActive ? "white" : "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "45px",
          borderRadius: "50%",
        }}
      >
        {children}
      </div>
    );
  };
}

export const H1Button = createBlockStyleButton({
  style: "header-one",
  children: <IconButton>H1</IconButton>,
});
export const H2Button = createBlockStyleButton({
  style: "header-two",
  children: <IconButton>H2</IconButton>,
});
export const H3Button = createBlockStyleButton({
  style: "header-three",
  children: <IconButton>H3</IconButton>,
});
export const H4Button = createBlockStyleButton({
  style: "header-four",
  children: <IconButton>H4</IconButton>,
});
export const BlockquoteButton = createBlockStyleButton({
  style: "blockquote",
  children: (
    <IconButton>
      <FormatQuoteIcon />
    </IconButton>
  ),
});
export const UnorderedListButton = createBlockStyleButton({
  style: "unordered-list-item",
  children: (
    <IconButton>
      <FormatListBulletedIcon />
    </IconButton>
  ),
});
