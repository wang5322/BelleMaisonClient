import React from "react";

function CalculatorInputGroup({
  text,
  icon,
  placeholder,
  value,
  onInput,
  onkeyup,
  readOnly = false,
}) {
  return (
    <div className="input-group mb-3 ">
      <span className="input-group-text ">
        {text} {icon}
      </span>
      <input
        type="number"
        value={value}
        className="form-control"
        placeholder={placeholder}
        onInput={onInput}
        onKeyUp={onkeyup}
        readOnly={readOnly}
      />
    </div>
  );
}

export default CalculatorInputGroup;