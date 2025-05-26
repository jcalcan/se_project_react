import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit
}) {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [formFields, setFormFields] = useState({
    name: "",
    garmentUrl: "",
    tempButton: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFields = {
      ...formFields,
      [name]: value
    };
    setFormFields(updatedFields);

    const isFormValid = handleValidation(updatedFields);

    if (isFormValid === true) {
      setIsValid(true);
      setErrorMessage({});
    } else {
      setIsValid(false);
      setErrorMessage(isFormValid);
    }
  };

  function resetForm() {
    setFormFields({
      name: "",
      garmentUrl: "",
      tempButton: ""
    });
    setIsValid(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onAddItemModalSubmit(
        {
          name: formFields.name,
          garmentUrl: formFields.garmentUrl,
          tempButton: formFields.tempButton
        },
        resetForm
      );
    }
  }

  const handleValidation = (data) => {
    const urlRegex = /^https?:\/\/\S+$/i;
    const errors = {};

    if (data.name.length < 3) {
      errors.name = "Garment name must be larger than 3";
    }

    if (!urlRegex.test(data.garmentUrl)) {
      errors.garmentUrl = "Garment link must be a valid URL";
    }
    if (data.tempButton === "") {
      errors.tempButton = "Please select hot, warm or cold";
    }

    return Object.keys(errors).length === 0 ? true : errors;
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="add-garment-name-input" className="modal__label">
        Name{" "}
        <input
          id="add-garment-name-input"
          type="text"
          className={`modal__input ${
            errorMessage.name ? "modal__input_type_error" : ""
          }`}
          name="name"
          placeholder="Name"
          required
          size="52"
          onChange={handleChange}
          value={formFields.name}
        />
        {errorMessage.name && (
          <span className="modal__error">{errorMessage.name}</span>
        )}
      </label>
      <label htmlFor="add-garment-link" className="modal__label">
        Image{" "}
        <input
          id="add-garment-link"
          type="url"
          className={`modal__input ${
            errorMessage.garmentUrl ? "modal__input_type_error" : ""
          }`}
          name="garmentUrl"
          placeholder="Image URL"
          required
          size="52"
          value={formFields.garmentUrl}
          onChange={handleChange}
        />
        {errorMessage.garmentUrl && (
          <span className="modal__error">{errorMessage.garmentUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="tempButton"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={formFields.tempButton === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="tempButton"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={formFields.tempButton === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="tempButton"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={formFields.tempButton === "cold"}
          />
          Cold
        </label>
      </fieldset>
      {errorMessage.tempButton && (
        <span className="modal__error">{errorMessage.tempButton}</span>
      )}
    </ModalWithForm>
  );
}
