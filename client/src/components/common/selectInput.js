import React from "react";

const SelectListGroup = ({ name, value, multiple, onChange, options }) => {
  const selectOptions = options
    ? options.map &&
      options.map((item, i) => (
        <option key={item.name} value={item._id}>
          {item.name}
        </option>
      ))
    : null;
  return (
    <div className="block">
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select option</option>
        {selectOptions}
      </select>
    </div>
  );
};

export default SelectListGroup;
