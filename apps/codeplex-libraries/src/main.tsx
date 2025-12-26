import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CodeplexThemeProvider } from '@codeplex-qwik/theme';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CodeplexThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CodeplexThemeProvider>
  </StrictMode>
);
