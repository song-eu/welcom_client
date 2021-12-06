import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
    (document.oncontextmenu = new Function('return false')),
    (document.ondragstart = new Function('return false')),
    (document.onselectstart = new Function('return false'))
)
