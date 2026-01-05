import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CodeplexProveedorTema } from '@codeplex-sac/theme';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CodeplexProveedorTema>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CodeplexProveedorTema>
  </StrictMode>
);
