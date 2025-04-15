import React, { useState, useRef, useEffect } from 'react';

function LoginForm({ onClose, onLogin }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (response.ok) {
        const userData = await response.json();
        setFormData({ email: '', password: '' });
        onClose();
        onLogin(userData); // Pass user data to parent component
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred during login.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-5" ref={formRef}>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
          aria-label="Email address"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 mb-4"
          required
          aria-label="Password"
        />
        <button
          type="submit"
          className={`bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
