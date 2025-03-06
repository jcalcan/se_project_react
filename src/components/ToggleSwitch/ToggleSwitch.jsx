import * as React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ isOn, handleToggle, onColor }) {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
        <p
          style={{
            color: !isOn ? onColor : "#00000080",
            zIndex: 1
          }}
          className="react-switch-temp"
        >
          F
        </p>
        <p
          style={{
            color: isOn ? onColor : "#00000080",
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
