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
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Budget } from './Pages/Budget'
import { Goal } from './Pages/Goal'




function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route  path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        <Route path='/incomes' element={<ProtectedRoute><IncomePage/></ProtectedRoute>}></Route>
        <Route path='/expenses' element={<ProtectedRoute><ExpensePage/></ProtectedRoute>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/transactions' element={<ProtectedRoute><Transactions/></ProtectedRoute>}></Route>
        <Route path='/budget' element={<Budget/>}></Route>
        <Route path='/goal' element={<Goal/>}></Route>
      </Routes>
    </BrowserRouter>
    
    

  </>
 
}

export default App
