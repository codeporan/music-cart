import React from "react";
const TextFieldGroup = ({
  error,
  name,
  placeholder,
  value,
  info,
  type,
  onChange
}) => {
  return (
    <div className="block">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <small className="form-text text-muted">{error}</small>}
    </div>
  );
};

export default TextFieldGroup;
