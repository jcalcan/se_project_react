import { useState, useEffect, useRef } from "react";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { weatherAPI } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 }
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    const weatherApi = new weatherAPI();
    weatherApi
      .getWeather()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
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
            />
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
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
