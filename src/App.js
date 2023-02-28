import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { FormBuider } from './FormBuilder';
import FormComponent from './FormComponent';

export default function App() {
  const [template, setTemplate] = React.useState({})
  const [sourceType, setSourceType] = React.useState("")
  const [showTemplate, setShowTemplate] = React.useState(false);
  const onFormData = (data, text) => {
    setShowTemplate(true);
    const templateWithValidations = Object.keys(data.template).map(
      (temp) => {
        const each = data.template[temp];
        each.keyName = temp;
        each.value = {
          value: '',
          error: true,
        };
        return each;
      }
    );
    setSourceType(text);
    setTemplate(templateWithValidations);
  }
  const onChange = (value, key, isRequired, pattern) => {
    const temps = [...template];
    let index = temps.findIndex((temp) => temp.keyName === key);
    const tempsObject = temps[index];
    let isValid = true;
    if (isRequired) {
      let reg = new RegExp(pattern);
      isValid = reg.test(value);
    }
    tempsObject.value = {
      value,
      error: !isValid,
    };

    temps.splice(index, 1, tempsObject);
    setTemplate([...temps]);
  };
  const onSubmit = () => {
    event.preventDefault();
    let temp = [...template]
    let payload = []
    temp.forEach(each => {
      const { value, keyName } = each;
      payload = {...payload, [keyName]: value.value}
    })
    fetch(`http://localhost:8080/v1/source/${sourceType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  return (
    <div>
      <div>
      <h1>Source Configuration</h1>
      <h3>Create a source</h3>
      <FormComponent onFormData={onFormData} disabled={showTemplate}/>
      </div>
      {showTemplate && <FormBuider template={template} onChange={onChange} onSubmit={onSubmit}/>}
    </div>
  );
}
