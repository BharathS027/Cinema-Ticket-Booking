async function Register(BASE_URL, formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Registration successful');
      return true;
    } else {
      console.error('Registration failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Register API error:', error);
    return false;
  }
}

export default Register;
