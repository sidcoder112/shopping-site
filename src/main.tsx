
/*import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Auth0Provider 
    domain='dev-m742104a0imk36f2.us.auth0.com'
    clientId='d75p7x5lBnbs2EVTeJUuGGGeJFhliMUm'
    authorizationParams = {{
      redirect_uri: window.location.origin
    }}>
    <App />
    </Auth0Provider>,

)
*/
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider 
    domain='dev-m742104a0imk36f2.us.auth0.com'
    clientId='d75p7x5lBnbs2EVTeJUuGGGeJFhliMUm'
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
