import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Dashboard } from './Pages/Dashboard'
import{IncomePage} from './Pages/IncomePage'

import { ExpensePage } from './Pages/ExpensePage'
import { Signup } from './Pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './Pages/Signin'
import { Transactions } from './Pages/Transaction'




function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route  path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/incomes' element={<IncomePage/>}></Route>
        <Route path='/expenses' element={<ExpensePage/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/transactions' element={<Transactions/>}></Route>
      </Routes>
    </BrowserRouter>
    
    

  </>
 
}

export default App
