import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (typeof onClose !== "function") {
      console.warn("useModalClose: Invalid props", { isOpen, onClose });
      return;
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);
}

export default useModalClose;
