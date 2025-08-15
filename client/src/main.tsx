import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerPWA } from './pwa';

// Register PWA service worker
registerPWA();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<App />);
