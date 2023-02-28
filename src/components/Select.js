import React from 'react';

export const Select = (props) => {
  const {
    label,
    options = [],
    required,
    value,
    regexErrorMessage,
    onChange,
    keyName,
    regex,
  } = props;
  React.useEffect(() => {
    if (options.length) {
        const {value} = options[0];
        onChange(value, keyName, true, regex)};
    }
    , []);
  return (
    <> {options.length > 0 ? <div>
        {label && <label>{label}</label>}
        <select
          required={required}
          value={value.value}
          onChange={(e) => onChange(e.target.value, keyName, required, regex)}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {value.error && required && (
          <span class="text-error">{regexErrorMessage}</span>
        )}
      </div>: null} </>
  );
};
