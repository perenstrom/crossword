import { useEffect, useState } from 'react';
import { Size } from 'types/Types';

export function useValuesStorage(
  planCode: string,
  size: Size
): [string[][], (values: string[][]) => void] {
  const [values, setValues] = useState<string[][]>(
    Array(size.y).fill(Array(size.x).fill(''))
  );

  useEffect(() => {
    const storedValues = localStorage.getItem('values');
    const values = storedValues && JSON.parse(storedValues);
    if (values && values[planCode]) {
      setValues(values[planCode]);
    }
  }, []);

  const storeValues = (values) => {
    const storedValues = localStorage.getItem('values');
    const parsedValues = storedValues && JSON.parse(storedValues);
    localStorage.setItem(
      'values',
      JSON.stringify({ ...parsedValues, [planCode]: values })
    );
  };

  return [values, storeValues];
}
