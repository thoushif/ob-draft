import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, createBrowserRouter, Link, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import MainProvider from './context/MainProvider'
import PrivateRoutes from './routes/PrivateRoutes'
import Error from './components/Error'
import Login from './pages/Login'
import Profile from './pages/Profile'


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoutes />,
        children: [
          {
            path: "spaces",
            lazy: () => {
              return import("./pages/Spaces");
            },
            errorElement: <Error message="Error getting spaces." />,
          },
          // {
          //   path: "users",
          //   lazy: () => {
          //     return import("./pages/Users");
          //   },
          //   errorElement: <Error message="Error getting users." />,
          // },
          // {
          //   path: "settings",
          //   element: <Settings />,
          // },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        async lazy() {
          let x = await import("./pages/Register");
          return { Component: x.default };
        },
        errorElement: <Error message="Error getting register page." />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>

      <RouterProvider router={router} />


      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/space/:spaceId" element={<Space />} />
          <Route
            path="/about"
            element={
              <>
                <div className="text-center">
                  <h1 className="text-xl">About</h1>
                  <div>
                    <Link to="/" className="text-purple-400 underline">
                      Home
                    </Link>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter> */}
    </MainProvider>
  </React.StrictMode>
)
