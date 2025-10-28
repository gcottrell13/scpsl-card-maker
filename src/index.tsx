import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
        <a className="build-number no-print" href={BUILD_LINK} target={'_blank'}>
            Build #{BUILD_NUM}
        </a>
    </React.StrictMode>,
  );
}
