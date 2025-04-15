async function Login(BASE_URL, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const userData = await response.json();

    // Store user info in a cookie for 5 minutes
    const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
    document.cookie = `userName=${userData.name}; expires=${expiryTime.toUTCString()}; path=/;`;

    return userData;
  } catch (error) {
    console.error('Login API error:', error);
    return null;
  }
}

export default Login;
