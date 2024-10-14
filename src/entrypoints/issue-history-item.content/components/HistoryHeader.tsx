import { ButtonGroup } from "@atlaskit/button";
import { IconButton } from "@atlaskit/button/new";
import BitbucketCompareIcon from "@atlaskit/icon/glyph/bitbucket/compare";
import EditorUndoIcon from "@atlaskit/icon/glyph/editor/undo";
import OverviewIcon from "@atlaskit/icon/glyph/overview";
import SelectClearIcon from "@atlaskit/icon/glyph/select-clear";
import { useStore } from "@nanostores/react";
import { FC } from "react";

import { IssueHistoryItemStore } from "../store";

import { NodeJSX } from "@/lib/dom/node";

export type HistoryHeaderProps = {
  store: IssueHistoryItemStore;
  element: Element;
};

export const HistoryHeader: FC<HistoryHeaderProps> = ({ store, element }) => {
  const storeState = useStore(store);

  return (
    <>
      {Array.from(element.childNodes).map((node, index) => (
        <NodeJSX key={index} node={node} />
      ))}
      <div style={{ float: "right" }}>
        <ButtonGroup>
          <IconButton
            icon={(iconProps) => (
              <SelectClearIcon {...iconProps} size={"small"} />
            )}
            label={"Clear"}
            onClick={() => store.set({ render: undefined })}
            spacing={"compact"}
          />
          <IconButton
            icon={(iconProps) => (
              <EditorUndoIcon {...iconProps} size={"small"} />
            )}
            isSelected={storeState.render === "default"}
            label={"Default"}
            onClick={() => store.set({ render: "default" })}
            spacing={"compact"}
          />
          <IconButton
            icon={(iconProps) => (
              <BitbucketCompareIcon {...iconProps} size={"small"} />
            )}
            isSelected={storeState.render === "diff-view"}
            label={"Diff"}
            onClick={() => store.set({ render: "diff-view" })}
            spacing={"compact"}
          />
          <IconButton
            icon={(iconProps) => <OverviewIcon {...iconProps} size={"small"} />}
            isSelected={storeState.render === "preview"}
            label={"Preview"}
            onClick={() => store.set({ render: "preview" })}
            spacing={"compact"}
          />
        </ButtonGroup>
      </div>
    </>
  );
};
