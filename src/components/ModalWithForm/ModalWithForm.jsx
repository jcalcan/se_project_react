import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal" id="add-garment-modal">
      <div className="modal__container">
        <h2 className="modal__title">New garment</h2>
        <form id="add-garment-form" className="modal__form" novalidate>
          <button type="button" className="modal__close"></button>
          <label for="add-garment-name-input" className="modal__label">
            Name{" "}
            <input
              id="add-garment-name-input"
              type="text"
              className="modal__input"
              name="name"
              placeholder="Name"
              required
              minlength="2"
              maxlength="30"
              size="52"
            />
            {/* <span class="add-garment-name-input-error"></span> */}
          </label>
          <label for="add-garment-link" className="modal__label">
            Image{" "}
            <input
              id="add-garment-link"
              type="url"
              className="modal__input"
              name="link"
              placeholder="Image URL"
              required
              minlength="13"
              size="52"
            />
            {/* <span className="add-garment-link-input-error"></span> */}
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the Weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input id="hot" type="radio" className="modal__radio-input" /> Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />
              Cold
            </label>
          </fieldset>

          <button type="submit" className="modal__submit-btn">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
