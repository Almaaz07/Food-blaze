import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <Auth0Provider
    domain="dev-u64a8s3j8ulykrn0.us.auth0.com"
    clientId="pqJC1sivG6ehhXHb7nFaJP5Hue384kFs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
    </Provider>
    
    </BrowserRouter>
 
  </React.StrictMode>
);


