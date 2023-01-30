import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
