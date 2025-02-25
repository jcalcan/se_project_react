import { useEffect, useRef, useCallback } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  const modalFormRef = useRef(null);

  // const closeModal = useCallback(() => {
  //   if (modalFormRef.current) {
  //     modalFormRef.current.classList.remove("modal_opened");
  //   }
  //   onClose();
  // }, [onClose]);

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (
        modalFormRef.current &&
        !modalFormRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [closeModal]);

  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal_opened"}`}
      id="add-garment-modal"
      ref={modalFormRef}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <form id="add-garment-form" className="modal__form">
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
          ></button>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
