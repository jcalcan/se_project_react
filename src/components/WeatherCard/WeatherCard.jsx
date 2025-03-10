import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const tempUnit = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {tempUnit.isOn ? weatherData.temp.C : weatherData.temp.F}&deg;
        {tempUnit.currentTemperatureUnit}
      </p>
      {/* <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p> */}
      <img src={sunny} alt="Weather Card" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
