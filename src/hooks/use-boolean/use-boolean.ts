import { type Dispatch, type SetStateAction, useCallback, useMemo, useRef, useState } from "react";

export type BooleanState = [
  boolean,
  {
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValueTemporarily: (tempValue: boolean, period: number) => void;
  }
];

function useBoolean(defaultValue?: boolean): BooleanState {
  const [value, setValue] = useState(!!defaultValue);
  const currTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((value: boolean) => !value), []);

  const setValueTemporarily = useCallback(
    (tempValue: boolean, period: number) => {
      if (currTimeoutId.current) clearTimeout(currTimeoutId.current);

      setValue(tempValue);

      currTimeoutId.current = setTimeout(() => setValue(value), period);
    },
    [currTimeoutId, setValue, value]
  );

  return useMemo(
    () => [value, { setValue, setTrue, setFalse, toggle, setValueTemporarily }],
    [setFalse, setTrue, toggle, value, setValueTemporarily]
  );
}

export default useBoolean;
