import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import classnames from "classnames";
import { EditorState, RichUtils } from "draft-js";
import React, { useCallback, useMemo } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
interface CreateBlockStyleButtonProps {
  blockType: string;
  children: React.ReactNode;
}

export interface BlockStyleButtonProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => unknown;
}

function createBlockStyleButton({
  blockType,
  children,
}: CreateBlockStyleButtonProps): React.FC<BlockStyleButtonProps> {
  return function BlockStyleButton({ editorState, setEditorState }) {
    const toggleStyle = useCallback(
      (event: React.MouseEvent): void => {
        event.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
      },
      [editorState, setEditorState]
    );

    const preventBubblingUp = useCallback(
      (e: React.MouseEvent) => e.preventDefault(),
      []
    );

    const blockTypeIsActive = useMemo(() => {
      // if the button is rendered before the editor
      if (!editorState) {
        return false;
      }

      const type = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      return type === blockType;
    }, [editorState]);

    const classes = classnames(
      "btn btn-sm",
      blockTypeIsActive ? "btn-success" : "btn-info"
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

export const H1Button = createBlockStyleButton({
  blockType: "header-one",
  children: <IconButton>H1</IconButton>,
});
export const H2Button = createBlockStyleButton({
  blockType: "header-two",
  children: <IconButton>H2</IconButton>,
});
export const H3Button = createBlockStyleButton({
  blockType: "header-three",
  children: <IconButton>H3</IconButton>,
});
export const H4Button = createBlockStyleButton({
  blockType: "header-four",
  children: <IconButton>H4</IconButton>,
});
export const BlockquoteButton = createBlockStyleButton({
  blockType: "blockquote",
  children: (
    <IconButton>
      <FormatQuoteIcon />
    </IconButton>
  ),
});
export const UnorderedListButton = createBlockStyleButton({
  blockType: "unordered-list-item",
  children: (
    <IconButton>
      <FormatListBulletedIcon />
    </IconButton>
  ),
});
