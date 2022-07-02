import { useEffect, useState } from "react";

type Props = {
  seconds: number;
  onFinish?: (countLeft: number) => void;
};

const useCountdown = ({ seconds, onFinish }: Props) => {
  const [countLeft, setCountLeft] = useState(seconds);

  useEffect(() => {
    if (!countLeft) {
      onFinish?.(countLeft);
      return;
    }
    next();
  }, [countLeft]);

  const next = () => {
    setTimeout(() => {
      setCountLeft(countLeft - 1);
    }, 1000);
  };

  const restart = () => {
    setCountLeft(seconds);
  };

  return {
    countLeft,
    restart,
  };
};

export default useCountdown;
