import React, { useState, useEffect } from 'react';
import { Form } from './Form';

export const FormBuider = (props) => {
  const {template, onChange, onSubmit} = props;

  return (
    <>
      <Form templates={template} onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
