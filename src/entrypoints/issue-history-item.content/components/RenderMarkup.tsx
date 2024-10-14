import { WikiMarkupTransformer } from "@atlaskit/editor-wikimarkup-transformer";
import { SmartCardProvider } from "@atlaskit/link-provider";
import { ReactRenderer } from "@atlaskit/renderer";
import { FC } from "react";

export type RenderMarkupProps = {
  markupTransformer: WikiMarkupTransformer;
  markupText: string;
};

export const RenderMarkup: FC<RenderMarkupProps> = ({
  markupTransformer,
  markupText,
}) => {
  const node = markupTransformer.parse(markupText);

  return (
    <SmartCardProvider>
      <ReactRenderer document={{ version: 1, ...node.toJSON() }} />
    </SmartCardProvider>
  );
};
