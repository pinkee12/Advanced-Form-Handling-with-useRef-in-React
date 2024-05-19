import React, { useRef, useState } from 'react';
import InputField from './InputField';
import ValidationMessage from './ValidationMessage';
import './DynamicForm.css'; 

const DynamicForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' });

  const handleFocus = (ref) => {
    ref.current.focus();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.length < 3 ? 'Name must be at least 3 characters long' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        error = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(formErrors).every(error => error === '');
    if (isValid) {
      console.log('Form Data:', formData);
    } else {
      console.log('Validation errors:', formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <InputField
        ref={nameRef}
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        onFocus={() => handleFocus(nameRef)}
        className="form-input"
      />
      <ValidationMessage message={formErrors.name} className="validation-message" />

      <InputField  className="form-input"
        ref={emailRef}
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        onFocus={() => handleFocus(emailRef)}
       
      />
      <ValidationMessage message={formErrors.email} className="validation-message" />

      <InputField  className="form-input"
        ref={passwordRef}
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onFocus={() => handleFocus(passwordRef)}
       
      />
      <ValidationMessage message={formErrors.password} className="validation-message" />

      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default DynamicForm;
