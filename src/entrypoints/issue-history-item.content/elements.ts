export const getElements = (element: Element) => {
  const card = element.children.item(1) as HTMLDivElement;
  const header = card.children.item(0) as HTMLDivElement;
  const content = card.children.item(1) as HTMLDivElement;

  return {
    header,
    content,
  };
};
