import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  DraftDecorator,
} from "draft-js";
import React, { useMemo } from "react";
export const LINK_BLOCK_TYPE = "LINK";

interface CustomDecoratorProps {
  block: ContentBlock;
  contentState: ContentState;
  entityKey: string;
  children?: any;
}

const Link: React.FC<CustomDecoratorProps> = ({
  contentState,
  entityKey,
  children,
}) => {
  const entity = useMemo(
    () => contentState.getEntity(entityKey),
    [contentState, entityKey]
  );
  const { href } = entity.getData();
  return <a href={href}>{children}</a>;
};

const findLinkEntities: DraftDecorator["strategy"] = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === LINK_BLOCK_TYPE
    );
  }, callback);
};

export const decorators = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);
