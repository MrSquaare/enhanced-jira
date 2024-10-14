export type Tracker = {
  selector: string;
  multiple?: boolean;
  onAdd?: (element: Element) => void;
  onRemove?: () => void;
};

export class Observer {
  private observer: MutationObserver;
  private trackers: Tracker[] = [];
  private trackedElementsBySelector = new Map<string, Set<Element>>();

  constructor(private target: Element) {
    this.observer = new MutationObserver(() => this.callback());
  }

  private callback() {
    for (const tracker of this.trackers) {
      const elements: Element[] = [];

      if (tracker.multiple) {
        const elementList = this.target.querySelectorAll(tracker.selector);

        elements.push(...elementList);
      } else {
        const element = this.target.querySelector(tracker.selector);

        if (element) {
          elements.push(element);
        }
      }

      const trackedElements =
        this.trackedElementsBySelector.get(tracker.selector) ||
        new Set<Element>();

      for (const element of elements) {
        const isTracked = trackedElements.has(element);

        if (!isTracked) {
          trackedElements.add(element);
          tracker.onAdd?.(element);
        }
      }

      for (const element of trackedElements) {
        const exists = elements.includes(element);

        if (!exists) {
          trackedElements.delete(element);
          tracker.onRemove?.();
        }
      }
    }
  }

  track(tracker: Tracker) {
    this.trackedElementsBySelector.set(tracker.selector, new Set<Element>());

    const index = this.trackers.push(tracker);

    return () => {
      this.trackedElementsBySelector.delete(tracker.selector);
      this.trackers.splice(index, 1);
    };
  }

  observe() {
    this.observer.observe(this.target, {
      childList: true,
      subtree: true,
    });
  }

  unobserve() {
    this.observer.disconnect();
  }
}
