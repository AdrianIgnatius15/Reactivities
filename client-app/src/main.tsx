import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css'
import { StoreContext, store } from './app/stores/contextStore/storeContext'
import { Router } from './app/router/Route'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={Router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
