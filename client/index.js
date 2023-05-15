import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import Modal from 'react-modal'; // import the Modal component

const container = document.getElementById('root');
const root = createRoot(container);

Modal.setAppElement(container); // set the app element for the Modal

root.render(<App />);
