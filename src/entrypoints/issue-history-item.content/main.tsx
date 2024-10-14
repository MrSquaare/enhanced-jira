import { createRoot } from "react-dom/client";

import { HistoryContent } from "./components/HistoryContent.tsx";
import { HistoryHeader } from "./components/HistoryHeader.tsx";
import { getElements } from "./elements.ts";
import { createIssueHistoryItemStore } from "./store.ts";

export const render = (element: Element) => {
  const elements = getElements(element);
  const store = createIssueHistoryItemStore();

  const headerClone = elements.header.cloneNode(true) as Element;
  const headerRoot = createRoot(elements.header);

  headerRoot.render(<HistoryHeader element={headerClone} store={store} />);

  const contentClone = elements.content.cloneNode(true) as Element;
  const contentRoot = createRoot(elements.content);

  contentRoot.render(<HistoryContent element={contentClone} store={store} />);
};
