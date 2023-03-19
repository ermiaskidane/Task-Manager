import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain='dev-4fae3hrgzah5n8mx.eu.auth0.com'
    clientId='UfnRNdiepKdqG2Iy0tJi4zOMGkjXtG3q'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
