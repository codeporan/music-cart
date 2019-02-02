import React from "react";
const TextFieldAreaGroup = ({
  error,
  name,
  placeholder,
  value,
  type,
  onChange
}) => {
  return (
    <div className="block">
      <textarea
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

export default TextFieldAreaGroup;
