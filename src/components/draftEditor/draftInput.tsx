import { useTheme } from "@mui/material";
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React, { useCallback, useMemo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { DraftEditor } from "./editor";

interface DraftInputProps extends UseControllerProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

export const DraftInput: React.FC<DraftInputProps> = (props) => {
  const theme = useTheme();
  const { editorState, setEditorState, ...controllerProps } = props;
  const { field } = useController(controllerProps);
  const defaultValue = useMemo(
    () => (field.value ? convertFromRaw(field.value) : undefined),
    [field]
  );
  const onChange = useCallback(
    (value: ContentState) => field.onChange(convertToRaw(value)),
    [field]
  );
  const input = useMemo(
    () => (
      <DraftEditor
        editorState={editorState}
        onChange={onChange}
        onBlur={field.onBlur}
        defaultValue={defaultValue}
        setEditorState={setEditorState}
      />
    ),
    [field, onChange, defaultValue, editorState, setEditorState]
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: '500px',
        background: theme?.palette.primary.light,
        borderRadius: 5,
      }}
    >
      <div>{input}</div>
    </div>
  );
};
