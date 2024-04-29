import { useEffect } from "react";

/**
 * @param {React.RefObject<HTMLElement>} ref - ref object referencing an HTML element
 * @param {callback} onClickOutside - The callback function to be executed
 * @returns {void}
 */
function useOutside(ref, onClickOutside, listenCapturing = false) {
  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, []);
}

export default useOutside;
