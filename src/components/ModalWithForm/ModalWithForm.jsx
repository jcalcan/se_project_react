import { useEffect, useRef, useCallback } from "react";
import "./ModalWithForm.css";
import useModalClose from "../../utils/closeModalHook";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  isOpen,
  onClose
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">
          <button type="button" className="modal__close" onClick={onClose} />

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
