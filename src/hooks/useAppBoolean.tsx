// crie um hook de toggle generic

import { useState } from 'react';

/**
 * A custom hook that manages a boolean state with toggle, set to true, and set to false functions.
 *
 * @param initial - Optional initial value for the boolean state, which can be a boolean or a function returning a boolean.
 * @returns  [value, toggleValue, toTrue, toFalse] - A tuple containing the current boolean value, a toggle function, a function to set the value to true, and a function to set the value to false.
 */
export function useAppBoolean(
  initial?: boolean | (() => boolean),
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initial || false);
  const toggleValue = () => setValue(!value);
  const toTrue = () => setValue(true);
  const toFalse = () => setValue(false);

  return [value, toggleValue, toTrue, toFalse];
}
