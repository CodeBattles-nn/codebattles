import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./global.css"
import "./utils/settings.js"

import './i18n';

import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

import("../node_modules/bootstrap-icons/font/bootstrap-icons.min.css")

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
