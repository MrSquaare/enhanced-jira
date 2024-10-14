import { RefCallback, FC } from "react";

export type NodeProps = {
  node: Node;
};

export const NodeJSX: FC<NodeProps> = ({ node }) => {
  const cloneNode = useRef<Node | null>(null);
  const parent = useRef<HTMLElement | null>(null);

  const refCallback = useCallback<RefCallback<HTMLDivElement>>(
    (element) => {
      if (element) {
        cloneNode.current = node.cloneNode(true);
        parent.current = element.parentElement;
        parent.current?.insertBefore(cloneNode.current, element);
      } else {
        parent.current?.removeChild(cloneNode.current!);
        parent.current = null;
        cloneNode.current = null;
      }
    },
    [node],
  );
  const style = useMemo(
    () => ({
      display: "none",
    }),
    [],
  );

  return <div ref={refCallback} style={style} />;
};
