import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { WeatherAPI } from "../../utils/weatherApi";

import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AppContext from "../../contexts/AppContext";
import { getToken, setToken } from "../../utils/token";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
    email: "",
    avatar: "",
    _id: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      return;
    }
    jsonServerApi
      .getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          username: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar,
          _id: data.data._id
        });
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
    // console.log("Card data:", card);
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
    const token = getToken();
    jsonServerApi
      .deleteItem(selectedCard._id, token)
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
    setErrorMessage("");
  }

  function handleModalSwitch() {
    activeModal === "signin"
      ? setActiveModal("signup")
      : setActiveModal("signin");
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
    const token = getToken();
    jsonServerApi
      .postItems(
        {
          name: name,
          imageUrl: garmentUrl,
          weather: tempButton
        },
        token
      )
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
        console.log(response);
        return jsonServerApi.authorize({ email, password });
      })
      .then((data) => {
        if (data.data.token) {
          setToken(data.data.token);
          return jsonServerApi.getUserInfo(data.data.token);
        }
      })
      .then((userinfo) => {
        setCurrentUser({
          username: userinfo.data.name,
          email: userinfo.data.email,
          avatar: userinfo.data.avatar || null,
          _id: userinfo.data._id
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
        // console.log("User Data:", data.data)
        setCurrentUser({
          username: data.data.name,
          email: data.data.email,
          _id: data.data._id,
          avatar: data.data.avatar || null
        });
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
        // console.log("Login Successful!")
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid email or password");
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: "", email: "", avatar: "", _id: "" });
    setToken("");
    navigate("/");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = getToken();
    jsonServerApi
      .updateUserInfo({ name, avatar }, token)
      .then(() => {
        return jsonServerApi.getUserInfo(token);
      })
      .then((data) => {
        // console.log("User Data:", data.data);
        setCurrentUser({
          username: data.data.name,
          email: data.data.email,
          _id: data.data._id,
          avatar: data.data.avatar
        });

        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Invalid email or avatar URL");
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? jsonServerApi
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : jsonServerApi
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleValidation = (data) => {
    const urlRegex = /^https?:\/\/\S+$/i;
    const errors = {};

    if (data.name.length < 3) {
      errors.name = "Username must be larger than 3";
    }

    if (!urlRegex.test(data.avatar)) {
      errors.avatar = "Avatar must be a valid URL";
    }

    return Object.keys(errors).length === 0 ? true : errors;
  };

  return (
    <AppContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        isLoggedIn,
        isLoading,
        currentUser,
        handleLogout,
        isOn: currentTemperatureUnit === "C",
        handleUpdateProfile,
        handleValidation
      }}
    >
      <div className="page">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser._id
                      )}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <RegisterModal
              isOpen={activeModal === "signup"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleModalSwitch={handleModalSwitch}
            />
            <LoginModal
              isOpen={activeModal === "signin"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleModalSwitch={handleModalSwitch}
              errorMessage={errorMessage}
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
              isLoggedIn={isLoggedIn}
              currentUserId={currentUser._id}
            />
            <ItemModalDeleteConfirmation
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onHandleDeleteCard={handleDeleteCard}
            />
            <Footer />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
