import { ContentBlock, ContentState } from "draft-js";
import { get, uniqueId } from "lodash-es";
import React, { useEffect, useRef } from "react";

interface CustomBlockProps {
  block: ContentBlock;
  contentState: ContentState;
  entityKey: string;
}

const TweetEmbed: React.FC<CustomBlockProps> = ({ block }) => {
  const randomId = useRef(uniqueId("tweet"));
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { id } = block.getData().toJS();
    if (divRef.current && divRef.current.id === randomId.current) {
      const twttr = get(window, "twttr");
      twttr.widgets.createTweet(id, divRef.current, { theme: "dark" });
    }
  }, [block]);
  return <div id={randomId.current} ref={divRef} />;
};

export function customBlockRenderer(contentBlock: ContentBlock) {
  const type = contentBlock.getType();
  if (type === "./tweetButton") {
    return {
      component: TweetEmbed,
      editable: false,
    };
  }
}

export const mediaBlockTypes = ["./tweetButton"];
