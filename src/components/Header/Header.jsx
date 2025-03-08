import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { useState, useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Header({ handleAddClick, weatherData, onColor }) {
  const tempUnit = useContext(CurrentTemperatureUnitContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric"
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="What to Wear App Logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch isOn={tempUnit.isOn} onColor={onColor} />
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <Link to="/profile">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
