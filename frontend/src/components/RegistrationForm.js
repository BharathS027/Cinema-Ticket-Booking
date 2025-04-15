import React, { useState, useRef, useEffect } from 'react';

function RegistrationForm({ onClose }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '', // still shown in form, not sent to backend
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  // Handle clicking outside of the form to close it
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update form data as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    const { name, surname, email, password } = formData;

    if (!name || !surname || !email || !password) {
      setErrorMessage('All required fields must be filled!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, password }),
      });

      setLoading(false);

      if (response.ok) {
        alert('Registration successful!');
        setFormData({ name: '', surname: '', email: '', phone: '', password: '' });
        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Registration failed. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container mx-auto mt-5" ref={formRef}>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
        />
        <button
          type="submit"
          className={`bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
