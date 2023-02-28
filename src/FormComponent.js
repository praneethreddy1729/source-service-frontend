import React, { useState } from 'react';

function FormComponent(props) {
  const [sourceType, setSourceType] = useState('');
  const [formTemplate, setFormTemplate] = useState(null);
  const [formData, setFormData] = useState(null);
  const {onFormData, disabled} = props;

  const handleInputChange = (event) => {
    setSourceType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/v1/source/template/${sourceType}`)
      .then((response) => response.json())
      .then((data) => {
        onFormData(data, sourceType);
        // setFormTemplate(data.template);
      })
      .catch((error) => console.error(error));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (formTemplate) {
    return (
      <form onSubmit={handleFormSubmit2}>
        {formTemplate.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData ? formData[field.name] : ''}
              onChange={handleFormChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <form>
      <label htmlFor="sourceType">Source Type:</label>
      <input
        type="text"
        id="sourceType"
        value={sourceType}
        onChange={handleInputChange}
      />
      <button class='btn btn-primary' onClick={handleFormSubmit} disabled={disabled}>Submit</button>
    </form>
  );
}

export default FormComponent;
