import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, isOn, handleToggle, onColor }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric"
  });

  return (
    <header className="header">
      <img className="header__logo" alt="What to Wear App Logo" src={logo} />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch isOn={isOn} handleToggle={handleToggle} onColor={onColor} />
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
