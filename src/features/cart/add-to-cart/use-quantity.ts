import { useCallback, useState } from 'react';

type Options = {
  initial?: number;
};

export const useQuantity = ({ initial = 0 }: Options = {}) => {
  const [quantity, setQuantity] = useState(() => initial);

  const handleQuantityChange = useCallback((nextValue: number) => {
    setQuantity(nextValue);
  }, []);

  return {
    quantity,
    setQuantity: handleQuantityChange,
  };
};

export type UseQuantityReturn = ReturnType<typeof useQuantity>;
