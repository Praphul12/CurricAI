import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { CourseProvider } from './context/CourseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain= {process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/home`,
      audience: process.env.REACT_APP_AUDIENCE
    }}
    logoutParams={{ returnTo: window.location.origin }}
  >
    <CourseProvider>
      <App />
    </CourseProvider>
  </Auth0Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
