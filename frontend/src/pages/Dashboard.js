import React, { useEffect, useState, useMemo } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import ChatBot from '../components/ChatBot';

function Dashboard() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Track the token in local state
  const [b2cAccessToken, setB2cAccessToken] = useState(null);
  const memoizedToken = useMemo(() => b2cAccessToken, [b2cAccessToken]);

  useEffect(() => {
    console.log("Dashboard effect triggered");

    // Check if the user is authenticated
    if (isAuthenticated && accounts.length > 0 && !b2cAccessToken) {
      console.log("User is authenticated, acquiring token...");
      const request = {
        scopes: ["https://pcsconsumer.onmicrosoft.com/0b8eead5-6c3a-4007-a033-9fc609ceaca4/access_as_user"], // Replace with your actual scope
        account: accounts[0],
      };

      // Attempt to acquire the token silently
      instance.acquireTokenSilent(request)
        .then((resp) => {
          console.log("Full acquireTokenSilent response:", resp);
          console.log("Access token:", resp.accessToken);
          setB2cAccessToken(resp.accessToken); // Set the token in state
        })
        .catch((err) => {
          console.error("Silent token acquisition error:", err);

          // If an interaction is required, fallback to acquireTokenPopup
          if (err.name === "InteractionRequiredAuthError") {
            console.log("Silent token acquisition failed, attempting popup...");
            instance.acquireTokenPopup(request)
              .then((resp) => {
                console.log("Token acquired via popup:", resp.accessToken);
                setB2cAccessToken(resp.accessToken); // Set the token in state
              })
              .catch((popupErr) => {
                console.error("Popup token acquisition error:", popupErr);
              });
          }
        });
    }
  }, [isAuthenticated, accounts, instance, b2cAccessToken]);

  return (
    <div>
      <h1 style={{ color: 'red' }}>Welcome to the Dashboard</h1>
      {console.log('[Dashboard] Final b2cAccessToken =', b2cAccessToken)}

      {b2cAccessToken ? (
        <ChatBot b2cAccessToken={b2cAccessToken} /> // Render chatbot if token exists
      ) : (
        <p>Please log in to see the chatbot.</p>
      )}
    </div>
  );
}

export default Dashboard;