import React from "react";

const useScale = (): {
  scale: number;
  increaseScale: () => void;
  decreaseScale: () => void;
} => {
  const [scale, setScale] = React.useState<number>(1);

  const increaseScale = () => setScale((prev) => Math.min(prev + 0.2, 2));
  const decreaseScale = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return { scale, increaseScale, decreaseScale };
};
export default useScale;
