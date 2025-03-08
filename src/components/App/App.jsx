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
import { defaultClothingItems } from "../../utils/constants";

const weatherApi = new WeatherAPI();

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: ""
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  console.log(currentTemperatureUnit);

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

  function closeActiveModal() {
    setActiveModal("");
  }

  function handleToggleSwitchChange() {
    console.log(currentTemperatureUnit);
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleAddItemModalSubmit({ name, garmentUrl, tempButton }) {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //update clothing array
    setClothingItems((prevItems) => {
      [
        { name, link: garmentUrl, weather: tempButton, _id: newId },
        ...prevItems
      ];
    });
    //close the modal
    closeActiveModal();
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
              <Route path="/profile" element={<Profile />} />
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
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
