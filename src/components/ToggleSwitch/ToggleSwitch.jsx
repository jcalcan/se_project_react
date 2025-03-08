import * as React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch({ onColor }) {
  const tempUnit = React.useContext(CurrentTemperatureUnitContext);

  return (
    <>
      <input
        checked={tempUnit.isOn}
        onChange={tempUnit.handleToggleSwitchChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
        <p
          style={{
            color: !tempUnit.isOn ? onColor : "#00000080",
            zIndex: 1
          }}
          className="react-switch-temp"
        >
          F
        </p>
        <p
          style={{
            color: tempUnit.isOn ? onColor : "#00000080",
            zIndex: 1
          }}
          className="react-switch-temp"
        >
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
