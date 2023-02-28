import React, { useState } from 'react';
import { Input } from './components/Input';
import { Select } from './components/Select';

export const Form = (props) => {
  const { templates, onChange, onSubmit } = props;

  return (
    <form>
      {templates.map((template, index) => {
        const { type } = template;
        return (
          <div key={`form-${index}`}>
            {type !== 'select' ? (
              <Input {...template} onChange={onChange} />
            ) : (
              <Select {...template} onChange={onChange} />
            )}
          </div>
        );
      })}
      <button onClick={onSubmit}>submit</button>
    </form>
  );
};
