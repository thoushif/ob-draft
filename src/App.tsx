import React, { ReactElement, useState } from 'react'
import ErrorBoundary from './pages/ErrorBoundary'
import { AuthProvider } from './context/AuthContext'
import { Outlet } from 'react-router-dom'


function App(): ReactElement {


  return (
    <ErrorBoundary>

      <AuthProvider>


        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-gray1 dark:bg-dark-blue1">
          <Outlet />
        </div>

      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
