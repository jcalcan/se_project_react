import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;F</p>
      <img src={sunny} alt="" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
