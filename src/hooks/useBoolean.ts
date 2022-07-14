import React, { SetStateAction, useCallback, useState } from 'react';

interface ReturnType {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: React.Dispatch<SetStateAction<boolean>>;
}

const useBoolean = (defaultValue?: boolean): ReturnType => {
  const [value, setValue] = useState<boolean>(!!defaultValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return {
    value,
    setFalse,
    setTrue,
    toggle,
    setValue,
  };
};

export default useBoolean;
