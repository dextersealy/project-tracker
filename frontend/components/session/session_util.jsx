import React from 'react';

export const Input = ({ type, label, value, handleChange, autoFocus }) => {
  const id = label.replace(/\s+/g,'_').toLowerCase().replace(/[^\w]/g,'')
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus || false}
        />
    </div>
  );
};

export const PasswordInput = ({ label, password, handleChange }) => {
  return (
    <Input
      type={'password'}
      label={label || 'Password:'}
      value={password}
      handleChange={handleChange}/>
  );
};

export const SubmitButton = ({ title, disabled }) => {
  return (
    <button type='submit' disabled={disabled}>{title}</button>
  )
};
