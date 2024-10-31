
import { Profile } from '../Components/Profile'
import { Menu } from '../Components/Menu'
import { SignOut } from '../Components/SignOut'
import styled from "styled-components";
import { Money } from '../Components/Money'
import { Balance } from '../Components/Balance'
  
import { Expense } from '../Components/Expense'
import { Income } from '../Components/Income'
import { Label } from '../Components/Label'
import { MinMax } from '../Components/MinMax'
import { ChartData } from '../Components/ChartData'
import axios from 'axios';
import { useEffect, useState } from 'react';
export function Dashboard(){
  const token=localStorage.getItem("token")

  
  const [amount,setAmount]=useState(0)
  const [expense,setExpense]=useState(0)
  const [balance,setBalance]=useState(0)
  const [minSalary,setMinSal]=useState(Infinity)
  const [maxSalary,setMaxSal]=useState(-Infinity)
  const [minExpense,setMinExp]=useState(Infinity)
  const [maxExpense,setMaxExp]=useState(Infinity)
  const [incomeAmount,setIncomeAmout]=useState([])
  const [expneseAmount,setExpenseAmout]=useState([])
  const [incomeChart,setIncomeChart]=useState({})
  const [expenseChart,setExpenseChart]=useState({})
  const[incomeTrans,setIncomeTrans]=useState([])
  const [expenseTrans,setExpenseTrans]=useState([])
  const [transaction,setTranasactions]=useState([])



  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://test-dv10.onrender.com/api/v1/income/getIncome',{
          headers:{Authorization:`Bearer ${token}`}
        });
        const modifiedIncome= response.data.users.map(function(income){
          const timestamp=parseInt(income._id.substring(0,8),16)
         
          const creationDate=new Date(timestamp*1000)
          income.creationDate=creationDate
          income.type="income"
          return income
          
  
      })
      setIncomeTrans(modifiedIncome)
      
      
      
        let totalAmount=0
        let min = Infinity;
        let max = -Infinity;
        let incomeChartArr={date:[],income:[]}
        let expenseCharArr={date:[],expense:[]}
       
        
        for(let i=0;i<response.data.users.length; i++){
          totalAmount+=response.data.users[i].amount
          incomeChartArr.income.push(response.data.users[i].amount)
          let dateString=response.data.users[i].date
          const date = new Date(dateString);
                    
          // Extract day, month, and year
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
          const year = date.getUTCFullYear();
          incomeChartArr.date.push(`${day}/${month}/${year}`)
         
          //incomeDateArr.push(`${day}/${month}/${year}`)
          if(response.data.users[i].amount<min){
            min=response.data.users[i].amount
          }
          if(response.data.users[i].amount>max){
            max=response.data.users[i].amount
          }
        }
        // setIncomeAmout(incomeAmountArr)
        // setIncomeDate(incomeDateArr)
       setAmount(totalAmount)
       setMaxSal(max)
       setMinSal(min)

       let TotalExpense=0;
       let minExp=Infinity
       let maxExp=-Infinity
       let expenseAmountArr=[]
        let expenseDateArr=[]  
         


        const res = await axios.get('https://test-dv10.onrender.com/api/v1/expense/getExpense',{
          headers:{Authorization:`Bearer ${token}`}
        });

        const modifiedExpense= res.data.users.map(function(expense){
          const timestamp=parseInt(expense._id.substring(0,8),16)
         
          const creationDate=new Date(timestamp*1000)
          expense.creationDate=creationDate
          expense.type="expense"
          return expense
          
  
      })
      setExpenseTrans(modifiedExpense)


      const union=[...modifiedIncome,...modifiedExpense]
        
        union.sort((a,b)=>b.creationDate-a.creationDate)
        let finalUnion=[]
        if(union.length<3){
          if(union.length==2){
            for(let i=0;i<2;i++){
              finalUnion.push(union[i])
            }

          }
          else if(union.length==1){
            
              finalUnion.push(union[0])
            
          }
        }else{
          for(let i=0;i<3;i++){
            finalUnion.push(union[i])
          }

        }
       
        
        
        
        
        setTranasactions(finalUnion)
        for(let i=0;i<res.data.users.length; i++){
          TotalExpense+=res.data.users[i].amount
          expenseCharArr.expense.push(res.data.users[i].amount)
          let dateString=res.data.users[i].date
          const date = new Date(dateString);
                    
                    // Extract day, month, and year
          const day = date.getUTCDate();
          const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
          const year = date.getUTCFullYear();
          expenseCharArr.date.push(`${day}/${month}/${year}`)

          
          if(res.data.users[i].amount<minExp){
            minExp=res.data.users[i].amount
          }
          if(res.data.users[i].amount>maxExp){
            maxExp=res.data.users[i].amount
          }
        }
        setIncomeChart(incomeChartArr)
        setExpenseChart(expenseCharArr)
        setMinExp(minExp)
        setMaxExp(maxExp)
        
        setExpense(TotalExpense);
        
        setBalance(totalAmount-TotalExpense)

        
   
        
        
     
     
        
        
        


        
        
        
        
        
        
      } catch (error) { 
        console.error("Error fetching income:", error);
      }
    };
  
    fetchIncome();
  }, []);
  const name=localStorage.getItem("name")
  
  
    return (<div className='grid grid-cols-12 '>
        <div className='bg-red-100 rounded-xl p-5 m-5 col-span-3 h-70'>
         <Profile  username={name}></Profile>
         <Menu image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
         </svg>} menuName={"Dashboard"} link={"dashboard"}></Menu>
   
   
         <Menu image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
         </svg>
         } menuName={"View Transactions"} link={"transactions"}></Menu>
         
   
         <Menu image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
         } menuName={"Incomes"} link={"incomes"}></Menu>
   
   
         <Menu image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
         </svg>
           } menuName={"Expenses"} link={"expenses"}></Menu>
      
   
           <SignOut image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
           </svg>
           } ></SignOut>
        
         
   
   
         
         </div>
         
       
         <div className='col-span-9  bg-red-100 m-5 rounded-xl p-5'>
           <div className='grid grid-cols-12'>
             <div className='col-span-7 grid grid-cols-2'>
               <div className='col-span-2'>
                <ChartData  incomeAmount={incomeTrans} expenseAmount={expenseTrans}></ChartData>
               </div>
   
               <Money label={"Total Money"} money={amount} ></Money>
               <Money label={"Total Expenses"} money={expense}></Money>
               <Balance money={balance}></Balance>
             </div>
             <div className="col-span-5 ml-8">
               <h1 className='font-bold text-md'>Recent History</h1>
               {transaction.map(function(transaction){
               return( transaction.type=="income"?<Income label={transaction.title} money={transaction.amount}></Income>:<Expense label={transaction.title} money={transaction.amount}></Expense>)
               })}
              <Label labelName={"Salary"}></Label>
              <MinMax min={minSalary} max={maxSalary}></MinMax>

              <Label labelName={"Expense"}></Label>
              <MinMax min={minExpense} max={maxExpense}></MinMax>
              
               
             </div>
             
   
           </div>
         </div> 
       
       
       </div>
      )
}