
import React, { forwardRef } from 'react';

const InputField = forwardRef(({ label, name, value, onChange, onFocus, type = 'text' }, ref) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      ref={ref}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  </div>
));

export default InputField;

