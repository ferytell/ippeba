import React from "react";

function Dropdown({ value, onChange, options, placeholder }) {
  return (
    <select value={value || ""} onChange={onChange} className="dropdown">
      <option value="" disabled>
        {placeholder || "Select an option"}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
