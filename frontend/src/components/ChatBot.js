import React, { useEffect, useState } from 'react';
import { createDirectLine } from 'botframework-webchat';
import ReactWebChat from 'botframework-webchat';

export default function ChatBot({ b2cAccessToken }) {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    // We only fetch the Direct Line token if we actually have a B2C token
    if (b2cAccessToken) {
      console.log("Fetching Direct Line token with b2cAccessToken...");
      fetch('http://localhost:5000/api/directline/token', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-store',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Direct Line token fetched:", data.token);
          setDirectLine(createDirectLine({ token: data.token }));
        })
        .catch((err) => {
          console.error("Error fetching Direct Line token:", err.message || err);
        });
      
  }
}, [b2cAccessToken]);

  if (!directLine) {
    return <div>Loading chat...</div>;
  }

  return (
    <div style={{ width: '400px', height: '400px', border: '1px solid black' }}>
      <ReactWebChat directLine={directLine} />
    </div>
  );
  
}
