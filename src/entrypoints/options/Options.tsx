import { Label } from "@atlaskit/form";
import { Box } from "@atlaskit/primitives";
import Select from "@atlaskit/select";
import { FC } from "react";

import { issueHistoryRenderStorage } from "../issue-history-item.content/storage";

import { useStorage } from "@/lib/storage/useStorage";

export const Options: FC = () => {
  const [issueHistoryRender, setIssueHistoryRender] = useStorage(
    issueHistoryRenderStorage,
  );

  const issueHistoryRenderOptions = useMemo(
    () => [
      { label: "Default", value: "default" },
      { label: "Diff view", value: "diff-view" },
      { label: "Preview", value: "preview" },
    ],
    [],
  );
  const issueHistoryRenderValue = useMemo(
    () =>
      issueHistoryRenderOptions.find(
        (option) => option.value === issueHistoryRender,
      ),
    [issueHistoryRenderOptions, issueHistoryRender],
  );

  return (
    <Box padding={"space.100"}>
      <Box>
        <Label htmlFor={"issue-history-render"}>Issue history render</Label>
        <Select
          className={"single-select"}
          classNamePrefix={"react-select"}
          inputId={"issue-history-render"}
          isClearable={false}
          onChange={(option) => {
            setIssueHistoryRender(option!.value);
          }}
          options={issueHistoryRenderOptions}
          value={issueHistoryRenderValue}
        />
      </Box>
    </Box>
  );
};
