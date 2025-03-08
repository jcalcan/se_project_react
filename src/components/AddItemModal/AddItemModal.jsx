import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit
}) {
  const [name, setName] = useState("");
  const [garmentUrl, setGarmentUrl] = useState("");
  const [tempButton, setTempButton] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageUrlChange(e) {
    setGarmentUrl(e.target.value);
  }

  function handleTempButton(e) {
    setTempButton(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItemModalSubmit({ name, garmentUrl, tempButton });
    //empty the inputs
    setName("");
    setGarmentUrl("");
    setTempButton("");
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-garment-name-input" className="modal__label">
        Name{" "}
        <input
          id="add-garment-name-input"
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          required
          size="52"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="add-garment-link" className="modal__label">
        Image{" "}
        <input
          id="add-garment-link"
          type="url"
          className="modal__input"
          name="link"
          placeholder="Image URL"
          required
          size="52"
          value={garmentUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="climate"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleTempButton}
            checked={tempButton === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="climate"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleTempButton}
            checked={tempButton === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="climate"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleTempButton}
            checked={tempButton === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
