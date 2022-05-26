import {
  ContentBlock,
  ContentState,
  EditorState,
  genKey,
  SelectionState,
} from "draft-js";
import { OrderedMap } from "immutable";

export function addContentBlockToState(
  editorState: EditorState,
  contentBlock: ContentBlock
) {
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const currentBlockKey = editorState.getSelection().getStartKey();
  const newBlockMap = OrderedMap().withMutations((r) => {
    blockMap.entrySeq().forEach((entry) => {
      const [k, v] = entry || [];
      r.set(k, v);
      if (currentBlockKey === k) {
        r.set(contentBlock.getKey(), contentBlock);
      }
    });
  });
  const newContentState = new ContentState(
    editorState.getCurrentContent().merge({ blockMap: newBlockMap })
  );
  return EditorState.push(editorState, newContentState, "insert-fragment");
}

export function addMediaContentBlockToState(
  editorState: EditorState,
  contentBlock: ContentBlock
) {
  const newUnstyledBlock = new ContentBlock({
    key: genKey(),
    type: "unstyled",
    text: "",
  });
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const currentBlockKey = editorState.getSelection().getStartKey();
  const newBlockMap = OrderedMap().withMutations((r) => {
    blockMap.entrySeq().forEach((entry) => {
      const [k, v] = entry || [];
      r.set(k, v);
      if (currentBlockKey === k) {
        r.set(contentBlock.getKey(), contentBlock);
        r.set(newUnstyledBlock.getKey(), newUnstyledBlock);
      }
    });
  });
  const newContentState = new ContentState(
    editorState.getCurrentContent().merge({ blockMap: newBlockMap })
  );
  const newSelectionState = SelectionState.createEmpty(
    newUnstyledBlock.getKey()
  );
  const withChanges = EditorState.push(
    editorState,
    newContentState,
    "insert-fragment"
  );
  return EditorState.forceSelection(withChanges, newSelectionState);
}
