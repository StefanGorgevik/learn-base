import { EditorState } from "draft-js";
import { uniqueId } from "lodash-es";
import React, { createContext, useReducer, useState, useCallback } from "react";
import {
  AllEditorContentsProps,
  EditorStateProps,
  Keyword,
  PostProps,
} from "../types";

interface StateProps {
  title: string;
  description: string;
  keywordValue: Keyword;
  keywords: Keyword[];
  category: string;
  isEditingContent: boolean;
}
const initialState: StateProps = {
  title: "",
  description: "",
  keywordValue: "",
  keywords: [],
  category: "javascript",
  isEditingContent: false,
};

const SET_DATA = "SET_DATA";
const SET_VALUE = "SET_VALUE";
const SAVE_KEYWORD = "SAVE_KEYWORD";
const DELETE_KEYWORD = "DELETE_KEYWORD";

function reducer(state: StateProps, action: any) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, ...action.payload };
    case SET_VALUE:
      return { ...state, [action.payload.type]: action.payload.value };
    case SAVE_KEYWORD:
      return {
        ...state,
        keywords: [...state.keywords, state.keywordValue],
        keywordValue: "",
      };
    case DELETE_KEYWORD:
      return {
        ...state,
        keywords: state.keywords.filter((k: Keyword) => k !== action.payload),
      };

    default:
      throw new Error();
  }
}

const initialCurrentEditorState: EditorStateProps = {
  id: "",
  editorState: EditorState.createEmpty(),
  gistData: {
    url: "",
    name: "",
  },
  editorStateName: "",
};

interface ContextProps {
  state: StateProps;
  dispatch: any;
  setDataHandler: (data: PostProps) => void;
  onValueChange: (type: string, value: any) => void;
  allEditorContents: AllEditorContentsProps[];
  setAllEditorContents: React.Dispatch<
    React.SetStateAction<AllEditorContentsProps[]>
  >;
  addNewContent: () => void;
  currentEditorState: EditorStateProps;
  setCurrentEditorState: React.Dispatch<React.SetStateAction<EditorStateProps>>;
  isEditingContent: boolean;
  setIsEditingContent: (isEditingContent: boolean) => unknown;
  saveKeyword: () => unknown;
  deleteKeyword: (keyword: Keyword) => unknown;
}

export const PostContext = createContext({} as ContextProps);

export const PostContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const [allEditorContents, setAllEditorContents] = useState<
    AllEditorContentsProps[]
  >([]);

  const [currentEditorState, setCurrentEditorState] =
    useState<EditorStateProps>(initialCurrentEditorState as EditorStateProps);

  const addNewContent = () => {
    const newEditorState = {
      id: uniqueId(),
      editorState: EditorState.createEmpty(),
      gistData: {
        url: "",
        name: "",
      },
      editorStateName: "",
    };

    setCurrentEditorState(newEditorState);
  };
  console.log("state", state);
  const setDataHandler = useCallback(
    (data: PostProps) => {
      dispatch({ type: SET_DATA, payload: data });
    },
    [dispatch]
  );

  const onValueChange = (type: string, value: any) => {
    dispatch({
      type: SET_VALUE,
      payload: {
        type,
        value,
      },
    });
  };
  const saveKeyword = () => {
    dispatch({
      type: SAVE_KEYWORD,
    });
  };

  const deleteKeyword = (keyword: Keyword) => {
    dispatch({
      type: DELETE_KEYWORD,
      payload: keyword,
    });
  };

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        setDataHandler,
        onValueChange,
        allEditorContents,
        setAllEditorContents,
        addNewContent,
        currentEditorState,
        setCurrentEditorState,
        isEditingContent,
        setIsEditingContent,
        saveKeyword,
        deleteKeyword,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
