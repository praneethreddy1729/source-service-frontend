import React from 'react';

export const Input = (props) => {
  const {
    type,
    label,
    placeholder,
    regex,
    regexErrorMessage="This is required",
    required,
    value,
    keyName,
    onChange,
  } = props;
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        pattern={regex}
        required={required}
        value={value.value}
        onChange={(e) => onChange(type==='input'? e.target.value: e.target.checked, keyName, required, regex)}
      />
      {value.error && required && (
        <span class="text-error">{regexErrorMessage}</span>
      )}
    </div>
  );
};
