export const issueHistoryRenderStorage = storage.defineItem<string>(
  "local:issue-history-render",
  {
    version: 1,
    init: () => "default",
    fallback: "default",
  },
);
