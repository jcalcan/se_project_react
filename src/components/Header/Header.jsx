import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import { useState } from "react";

function Header({ handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric"
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">{currentDate}, LOCATION</p>
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
