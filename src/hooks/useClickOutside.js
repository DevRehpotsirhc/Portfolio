import { useEffect } from "react";

export const useClickOutside = (refs = [], callback, active = true) => {
  useEffect(() => {
    if (!active) return;

    const handleClick = (event) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (isOutside) callback();
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [refs, callback, active]);
};