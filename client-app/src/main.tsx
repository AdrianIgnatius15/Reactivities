import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
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
