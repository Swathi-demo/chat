// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfigB2C, msalConfigEntraID } from './authConfig';
import { Provider } from 'react-redux';
import store from './redux/store';

const authType = process.env.REACT_APP_AUTH_TYPE || 'b2c';
const msalConfig = authType === 'b2c' ? msalConfigB2C : msalConfigEntraID;
const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);
