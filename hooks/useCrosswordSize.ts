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
    const crosswordArea = {
      width: wrapperElement.current.offsetWidth,
      height: wrapperElement.current.offsetHeight
    };
    const crosswordSize = calculateCrosswordSize(crosswordArea, size);
    setCrosswordSize(crosswordSize);
  };
  const debouncedCalculateNewCrosswordSize = debounce(
    calculateNewCrosswordSize,
    50
  );

  useEffect(() => {
    calculateNewCrosswordSize();
    setLoaded(true);
  }, [wrapperElement.current]);

  useEffect(() => {
    window.addEventListener('resize', debouncedCalculateNewCrosswordSize);
    return () => {
      window.removeEventListener('resize', debouncedCalculateNewCrosswordSize);
    };
  }, []);

  return [crosswordSize, loaded];
}
