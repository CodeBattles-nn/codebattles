import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./global.css"
import "./utils/settings.js"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        {/*<ThemeChanger />*/}
    </React.StrictMode>,
)