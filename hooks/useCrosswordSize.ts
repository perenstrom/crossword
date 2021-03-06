import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { PixelSize, Size } from 'types/Types';
import { calculateCrosswordSize } from 'utils/calculateCrosswordSize';

export function useCrosswordSize(
  wrapperElement: React.MutableRefObject<HTMLDivElement>,
  size: Size
): [PixelSize, boolean] {
  const [crosswordSize, setCrosswordSize] = useState<PixelSize>({
    width: 0,
    height: 0
  });
  const [loaded, setLoaded] = useState(false);

  const calculateNewCrosswordSize = () => {
    setLoaded(false);
    const crosswordArea = {
      width: wrapperElement.current.offsetWidth,
      height: wrapperElement.current.offsetHeight
    };
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);
    setCrosswordSize(crosswordSize);
    setLoaded(true);
  };
  const debouncedCalculateNewCrosswordSize = debounce(
    calculateNewCrosswordSize,
    50
  );

  useEffect(() => {
    setLoaded(false);
    calculateNewCrosswordSize();
    setLoaded(true);
  }, [wrapperElement.current, size]);

  useEffect(() => {
    window.addEventListener('resize', debouncedCalculateNewCrosswordSize);
    return () => {
      window.removeEventListener('resize', debouncedCalculateNewCrosswordSize);
    };
  }, []);

  return [crosswordSize, loaded];
}
