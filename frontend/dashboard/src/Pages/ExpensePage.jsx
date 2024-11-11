import { Profile } from '../Components/Profile'
import { Menu } from '../Components/Menu'
import { SignOut } from '../Components/SignOut'

import '../App.css'
  

import { IncomeDetail } from '../Components/IncomeDetails';
import { TotalExpense } from '../Components/TotalExpense';
import { useState,useEffect } from 'react';
import axios from 'axios';
import mailchimp from '@mailchimp/mailchimp_marketing'


export function ExpensePage(){
  const[title,setTitle]=useState("")
  const[amount,setAmount]=useState("")
  const [TotalAmount,setTotalAmount]=useState(0)
  const[date,setDate]=useState("")
  const[about,setAbout]=useState("")
  const [transactionID,setTransID]=useState(0)
  const [newId,setNewID]=useState(null)
  const[email,setEmail]=useState("")

  const token=localStorage.getItem("token")
  const[Incomes,setIncomes]=useState([])
  const [safeLimit,setLimit]=useState(0)
  const [currAmount,setCurrAmount]=useState(0)

  useEffect(() => {
    const lastExpenseID = localStorage.getItem("lastExpenseID");
    if (lastExpenseID) {
        setTransID(lastExpenseID);
    }
}, []);
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/expense/getExpense',{
          headers:{Authorization:`Bearer ${token}`}
        });
        const incomes=response.data.users
        setIncomes(incomes)
        const res=await axios.get('http://localhost:3000/api/v1/user/getDetails',{
          headers:{Authorization:`Bearer ${token}`}
        })
        setEmail(res.data.userDetails[0].username)

        
        setLimit(Math.floor(res.data.userDetails[0].budget*.8));
        const expenseDates=[];
       response.data.users.map(function(item){
        expenseDates.push(item.date)
        //console.log(expenseDates);
      })

      const now=new Date();
      const currentMonth = now.getMonth()+1;
      const currentYear = now.getFullYear();
      const currentData=response.data.users.filter(function(item){
        const date=new Date(item.date)
        const itemMonth=date.getMonth()+1
        
        
        return itemMonth===currentMonth && date.getFullYear()===currentYear
      })
      let currentAmount=0
      currentData.map(function(item){
        currentAmount+=item.amount
      })
      setCurrAmount(currentAmount)
      
      
      
      
      const limit=Math.floor(res.data.userDetails[0].budget*.8)
      if(currentAmount>=limit){
        console.log(currentAmount);
        console.log(limit);
        
        
        async function sendMail(){
          await axios.post("http://localhost:3000/api/v1/user/subscribe",{email:email,subject:"Expenses near budget limit",text:"Please spend carefully"})
          alert("Your budget is 80% or more  completed,Please spend caarefully.")
        }
        sendMail()
        
        

      }
      
      
      
      
      
      
      
      
        let totalAmount=0
        
        for(let i=0;i<response.data.users.length; i++){
          totalAmount+=response.data.users[i].amount
        }
       setTotalAmount(totalAmount)
      } catch (error) { 
        console.error("Error fetching income:", error);
      }
    };
  
    fetchIncome();
    
  }, []);


//   useEffect(() => {
//     const fetchIncome = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/expense/getExpense',{
//           headers:{Authorization:`Bearer ${token}`}
//         });
        
//        const expenseDates=[];
//        response.data.users.map(function(item){
//         expenseDates.push(item.date)
//         console.log(expenseDates);
        
//        })
       
       
       
        
//       } catch (error) { 
//         console.error("Error fetching income:", error);
//       }
      
//   }; fetchIncome();},[]
// );  
    const name=localStorage.getItem('name')
    return (<div className='grid grid-cols-12 '>
        <div className='bg-red-100 rounded-xl p-5 m-5 col-span-3 h-70'>
         <Profile username={name}></Profile>
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

<Menu image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
} menuName={"Goals"} link={"goal"}></Menu>
      
   
           <SignOut image={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
           </svg>
           } menuName={"SignOut"}></SignOut>
        
         
   
   
         
         </div>
         <div className='col-span-9  bg-red-100 m-5 rounded-xl p-5'>
            <TotalExpense money={TotalAmount}></TotalExpense>
            <div className='grid grid-cols-12'>
              <div className='col-span-3'>
                <input onChange={function(e){
                  setTitle(e.target.value)
                }} type="text" placeholder='Expense Title' className='rounded-sm p-2 mt-5' />

                <input  onChange={function(e){
                  setAmount(e.target.value)
                }} type="Numeric" placeholder='Expense Amount' className='rounded-sm p-2 mt-5' />

                <input  onChange={function(e){
                  setDate(e.target.value)
                }} type="date" placeholder='Enter a date' className='rounded-sm p-2 mt-5 font-thin text-gray-500' />

                <select name="" id="" className='rounded-sm p-2 mt-5 justify-end text-gray-500'>
                  <option value="Select option" className='font-thin text-gray-500'>Select Option</option>
                  <option value="Education">Education</option>
                  <option value="Groceries">Groceries</option>
                  
                  <option value="Health">Health</option>
                  <option value="Subcriptions">Subcriptions</option>
                  <option value="Takeaways">Takeaways</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Travelling">Travelling</option>
                  <option value="other">other</option>
                 

                </select>
                {/* <input type='text' placeholder='Add A refernce'></input> */}
                <textarea  onChange={function(e){
                  setAbout(e.target.value)
                }} name="" id="" placeholder='Add A refernce'  className='rounded-sm p-2 mt-5' rows={5} cols={22}></textarea>

                <button onClick={async function(){
                 const res=   await axios.post("http://localhost:3000/api/v1/expense/addExpense",{
                      title,type:about,amount,date
                    },{
                      headers:{Authorization:`Bearer ${token}`}
                    })
                    setTransID(res.data._id)
                    //setNewID(transactionID)
                    localStorage.setItem('lastExpenseID',res.data._id)
                    
                    
                    
                    window.location.reload()
                }} className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl mt-5'>Add Expense</button>
                    
                
              </div>
              <div className='col-span-9'>
                {/* <IncomeDetail IncomeType={"Dentist Appointment"} details={"Tooth removal"} date={"2023/02/21"} amount={120}></IncomeDetail> */}
                {Incomes.map(function(income){
                    const dateString = income.date;
                    const date = new Date(dateString);
                    
                    // Extract day, month, and year
                    const day = date.getUTCDate();
                    const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
                    const year = date.getUTCFullYear();
                    
                   ;
                    return <IncomeDetail func={async function(e){
                      const id=e.currentTarget.dataset.id
                      console.log(id);  
                      
                      await axios.delete(`http://localhost:3000/api/v1/expense/deleteExpense/${id}`,{
                        headers:{Authorization:`Bearer ${token}`}
                      })
                      window.location.reload()
                    }}  IncomeType={income.title} details={income.type} date={`${day}/${month}/${year}`} amount={income.amount} transactionID={income._id} ></IncomeDetail>
                    
                    
                  })}
              </div>
            
            

            </div>
            
           
           </div>
         </div> 
        
    )
}