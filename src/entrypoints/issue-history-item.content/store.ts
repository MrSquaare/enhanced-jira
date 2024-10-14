import { atom } from "nanostores";

export type IssueHistoryItemStoreState = {
  render?: string;
};

export const createIssueHistoryItemStore = () =>
  atom<IssueHistoryItemStoreState>({
    render: undefined,
  });

export type IssueHistoryItemStore = ReturnType<
  typeof createIssueHistoryItemStore
>;
