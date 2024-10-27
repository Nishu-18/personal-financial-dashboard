import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Profile } from './Components/Profile'
import { Menu } from './Components/Menu'
import { SignOut } from './Components/SignOut'
import styled from "styled-components";
import { Money } from './Components/Money'
import { Balance } from './Components/Balance'
  
import { Expense } from './Components/Expense'
import { Income } from './Components/Income'
import { Label } from './Components/Label'
import { MinMax } from './Components/MinMax'
import { ChartData } from './Components/ChartData'
import { Dashboard } from './Pages/Dashboard'
import{IncomePage} from './Pages/IncomePage'
import { TotalIncome } from './Components/Totalincome'
import { IncomeDetail } from './Components/IncomeDetails'
import { ExpensePage } from './Pages/ExpensePage'
import { Signup } from './Pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './Pages/Signin'




function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route  path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/incomes' element={<IncomePage/>}></Route>
        <Route path='/expenses' element={<ExpensePage/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
      </Routes>
    </BrowserRouter>
    
    

  </>
 
}

export default App
