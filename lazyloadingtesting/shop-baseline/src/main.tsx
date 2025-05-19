import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SpeedInsights } from "@vercel/speed-insights/next"

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <SpeedInsights/>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}