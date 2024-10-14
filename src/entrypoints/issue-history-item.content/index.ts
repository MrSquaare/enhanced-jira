import { Observer } from "../../lib/dom/observer";

import { selector } from "./constants";
import { render } from "./main";

export default defineContentScript({
  matches: ["*://*.atlassian.net/browse/*"],
  runAt: "document_end",
  main() {
    const observer = new Observer(document.body);

    observer.track({
      selector: selector,
      multiple: true,
      onAdd(element) {
        render(element);
      },
    });

    observer.observe();
  },
});
