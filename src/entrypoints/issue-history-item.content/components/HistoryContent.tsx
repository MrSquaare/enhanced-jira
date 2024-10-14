import { WikiMarkupTransformer } from "@atlaskit/editor-wikimarkup-transformer";
import { useStore } from "@nanostores/react";
import { FC } from "react";
import ReactDiffViewer from "react-diff-viewer";

import { issueHistoryRenderStorage } from "../storage";
import { IssueHistoryItemStore } from "../store";

import { RenderMarkup } from "./RenderMarkup";

import { NodeJSX } from "@/lib/dom/node";
import { useStorage } from "@/lib/storage/useStorage";

export type HistoryContentProps = {
  store: IssueHistoryItemStore;
  element: Element;
};

const markupTransformer = new WikiMarkupTransformer();

export const HistoryContent: FC<HistoryContentProps> = ({ store, element }) => {
  const storeState = useStore(store);
  const [storageRender] = useStorage(issueHistoryRenderStorage);
  const render = useMemo(
    () => storeState.render || storageRender,
    [storeState.render, storageRender],
  );
  const beforeMarkup = element.children.item(0)?.textContent || "";
  const afterMarkup = element.children.item(2)?.textContent || "";

  if (render === undefined) {
    return null;
  }

  if (render === "diff-view") {
    return <ReactDiffViewer newValue={afterMarkup} oldValue={beforeMarkup} />;
  }

  if (render === "preview") {
    return (
      <>
        <RenderMarkup
          markupText={beforeMarkup}
          markupTransformer={markupTransformer}
        />
        <NodeJSX node={element.children.item(1) as Element} />
        <RenderMarkup
          markupText={afterMarkup}
          markupTransformer={markupTransformer}
        />
      </>
    );
  }

  return (
    <>
      {Array.from(element.childNodes).map((node, index) => (
        <NodeJSX key={index} node={node} />
      ))}
    </>
  );
};
