import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/ReduxStore.js';
import {BrowserRouter, Routes, Route} from "react-router-dom"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
      <Routes>
        <Route path = "*" element={<App />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
