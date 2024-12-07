import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from "./App";
import './main.css';

import { Suspense } from 'react'
import LoadingSpinner from './components/Loading';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
