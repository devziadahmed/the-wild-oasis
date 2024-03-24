import { useEffect } from "react";

/**
 * @param {React.RefObject<HTMLElement>} ref - ref Object referencing an HTML element
 * @param {callback} onScrollCallback - The callback function to be executed
 */
function useScroll(ref, onScrollCallback) {
  const element = ref.current;

  useEffect(() => {
    element.addEventListener("scroll", onScrollCallback);

    return () => {
      element.removeEventListener("scroll", onScrollCallback);
    };
  }, [element, onScrollCallback]);
}

export default useScroll;
