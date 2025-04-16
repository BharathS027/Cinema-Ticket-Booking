async function BuyTickets(BASE_URL, formData) {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Uncomment if you need JWT Authentication
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();  // Capture response data (if needed)
      console.log('Order successful', data);
      return data;  // You can return the data if needed
    } else {
      const errorData = await response.json();
      console.error('Order failed', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error occurred while ordering:', error);
    return false;
  }
}

export default BuyTickets;
