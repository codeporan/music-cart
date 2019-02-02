import React from "react";

const SelectCustomGroup = ({ name, value, onChange, options, error }) => {
  console.log(options);
  const selectOptions = options
    ? options.map &&
      options.map((item, i) => (
        <option key={item.value} value={item.key}>
          {item.key}
        </option>
      ))
    : null;
  return (
    <div className="block">
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select option</option>
        {selectOptions}
      </select>
      {error && <small className="form-text text-muted">{error}</small>}
    </div>
  );
};

export default SelectCustomGroup;
