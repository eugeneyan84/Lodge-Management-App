import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from './ui/ErrorHandler.jsx';
import GlobalStyles from './styles/GlobalStyles.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyles />
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onReset={() => window.location.replace('/')}
    >
      <App />
    </ErrorBoundary>
  </>
);
