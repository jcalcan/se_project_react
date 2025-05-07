import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit, isOn } = useContext(AppContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {isOn ? weatherData.temp.C : weatherData.temp.F}&deg;
        {currentTemperatureUnit}
      </p>
      {/* <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p> */}
      <img src={sunny} alt="Weather Card" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
