import { WxtStorageItem } from "wxt/storage";

export const useStorage = <TValue, TMetadata extends Record<string, unknown>>(
  storageItem: WxtStorageItem<TValue, TMetadata>,
) => {
  const [memoryValue, setMemoryValue] = useState<TValue>(storageItem.fallback);

  useEffect(() => {
    storageItem.getValue().then((value) => {
      setMemoryValue(value);
    });

    const unwatch = storageItem.watch((newValue) => {
      setMemoryValue(newValue);
    });

    return () => {
      unwatch();
    };
  }, [storageItem]);

  const value = memoryValue;
  const setValue = useCallback(
    async (value: TValue) => {
      await storageItem.setValue(value);
    },
    [storageItem],
  );

  return [value, setValue] as const;
};
