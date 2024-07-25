import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './apps/login_page/login';
import Root from './apps/root';
import Dashboard from './apps/dashboard_page/dashboard';
import InputPage from './apps/input_page/inputpage';
import RecordPage from './apps/record_page/recordpage';
import OutcomeTable from './apps/record_page/outcometable';

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
      {
        path:"record",
        element: <RecordPage />,
        children: [
          {
            path:"outcome",
            element:<OutcomeTable />
          },
          {
            path:"income",
            element:<OutcomeTable />
          }
        ]
      },
      {
        path: "input",
        element: <InputPage />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={app} />
  </React.StrictMode>,
)
