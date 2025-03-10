import { useState, useEffect, useRef } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { WeatherAPI } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

import ItemModalDeleteConfirmation from "../ItemModalDeleteConfirmation/ItemModalDeleteConfirmation";
import { JsonAPI } from "../../utils/api";

const weatherApi = new WeatherAPI();
const jsonServerApi = new JsonAPI();

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: ""
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    jsonServerApi.getItems().then(setClothingItems).catch(console.error);
  }, []);

  useEffect(() => {
    weatherApi
      .getWeather()
      .then((data) => {
        const filteredWeatherData = weatherApi.filterWeatherData(data);

        setWeatherData(filteredWeatherData);
      })
      .catch(console.error);
  }, []);

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleDeleteCardConfirmation() {
    setActiveModal("confirm-delete");
  }

  function handleDeleteCard() {
    jsonServerApi
      .deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
      })
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleAddItemModalSubmit(
    { name, garmentUrl, tempButton },
    resetForm
  ) {
    jsonServerApi
      .postItems({
        name: name,
        imageUrl: garmentUrl,
        weather: tempButton
      })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
      })
      .then(() => {
        closeActiveModal();
      })
      .then(() => {
        resetForm();
      })
      .catch(console.error);
  }

  return (
    <HashRouter>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
            isOn: currentTemperatureUnit === "C"
          }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onColor={"#fff"}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteCardConfirmation}
            />
            <ItemModalDeleteConfirmation
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onHandleDeleteCard={handleDeleteCard}
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
