import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './apps/login_page/login';
import Root from './apps/root';
import Dashboard from './apps/dashboard_page/dashboard';

// 設置ルティング
const app = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      // {
      //   path:"record",
      //   element: <Record />
      // },
      // {
      //   path: "input",
      //   element: <Input />,
      // }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={app} />
  </React.StrictMode>,
)
