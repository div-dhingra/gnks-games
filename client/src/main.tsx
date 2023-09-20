import ReactDOM from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom';

import App from './App.js'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  

    <BrowserRouter>
      <App />
    </BrowserRouter> 
  
);

// * To remove <react.strictmode/> without error, also remove import of 'React' into main.tsx. -> unused imports/variables 
// * throw errors in typescript...
