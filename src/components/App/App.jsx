import { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  redirect
} from "react-router-dom";
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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getToken, setToken } from "../../utils/token";

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
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    jsonServerApi
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setCurrentUser({ username, email });
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

  function handleSignupClick() {
    setActiveModal("signup");
  }

  function handleLoginClick() {
    setActiveModal("signin");
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

  function handleRegistration({ name, email, password, avatar }) {
    return jsonServerApi
      .createUser({
        name,
        email,
        password,
        avatar
      })
      .then((response) => {
        console.log("Create user response:", response);
        return jsonServerApi.authorize({ email, password });
      })
      .then((data) => {
        console.log("Authorization response:", data);
        console.log("JWT received:", data.data.token);
        if (data.data.token) {
          setToken(data.data.token);
          return jsonServerApi.getUserInfo(data.data.token);
        }
      })
      .then((userinfo) => {
        setCurrentUser({
          username: userinfo.data.name,
          email: userinfo.data.email
        });
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Email already exists") {
          return Promise.reject(
            "This email is already registered. Please use a different email or try logging in."
          );
        }
        return Promise.reject(
          "An error occurred during registration. Please try again."
        );
        console.error(error);
      });
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    jsonServerApi
      .authorize({ email, password })
      .then((data) => {
        if (data.data.token) {
          setToken(data.data.token);
          return jsonServerApi.getUserInfo(data.data.token);
        }
      })
      .then((data) => {
        setCurrentUser({ username: data.data.name, email: data.data.email });
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
        console.log("Login Successful!");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid email or password");
      });
  }

  return (
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
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <RegisterModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
          />

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
  );
}

export default App;
