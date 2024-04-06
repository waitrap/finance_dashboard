import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './apps/login_page/login';

// 設置路由
const app = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={app} />
  </React.StrictMode>,
)
