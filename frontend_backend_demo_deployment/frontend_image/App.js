import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>MyApp Frontend</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;