import React, { ReactElement, useState } from 'react'
import Space from './components/space'
import MainProvider from './context/MainProvider'

function App(): ReactElement {
  

  return (
    <div className="p-20 border shadow-xl border-gray-50 rounded-xl">
       <MainProvider>
         <Space />
      </MainProvider>
    </div>
  )
}

export default App
