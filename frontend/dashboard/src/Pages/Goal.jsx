import { Profile } from "../Components/Profile"
import { Menu } from "../Components/Menu"
import { SignOut } from "../Components/SignOut"
import { useEffect, useState } from "react"
import axios from "axios"
import { GoalDetails } from "../Components/GoalDetails"

export function Goal(){
    const [goals,setGoal]=useState([])
    const name=localStorage.getItem('name') 
    const token=localStorage.getItem("token")
    const [goalName,setName]=useState("")
    const [target,setTarget]=useState(0)
    const [saved,setSaved]=useState(0)
    const [percent,setPercent]=useState(0)
    useEffect(()=>{
        async function getGoal(){
          const goal=   await axios.get("http://localhost:3000/api/v1/user/getDetails",{
            headers:{Authorization:`Bearer ${token}`}
          })
          setGoal(goal.data.userDetails[0].goals)
          
        }
        getGoal()
    },[])



return( <div>

     
    <div className='grid grid-cols-12 '>
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
         <div className="bg-red-100 rounded-xl p-5 m-5 col-span-9 h-70">
            
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <h1 className="text-2xl font-medium">Add a goal</h1>
                    <input onChange={function(e){
                        setName(e.target.value)
                    }} className="mt-5 rounded-sm p-1" type="text" name="" id=""  placeholder="Goal name"/>
                    <input onChange={function(e){
                        setTarget(e.target.value)
                    }} className="mt-5 rounded-sm p-1" type="number" placeholder="Goal Target" min={0} />
                    <input onChange={function(e){
                        setPercent(e.target.value)
                    }} className="mt-5 rounded-sm p-1"  type="number" placeholder="Allocation percentage" />
                    <input onChange={function(e){
                        setSaved(e.target.value)
                       
                        
                    }} className="mt-5 rounded-sm p-1"  type="number" placeholder="Starting Amount" min={0} />
                    <button onClick={async function(){
                        await axios.post("http://localhost:3000/api/v1/user/addGoal",{
                            name:goalName,targetAmount:target,savedAmount:saved,percent:percent
                        },{headers:{Authorization:`Bearer ${token}`}})
                        window.location.reload()
                        
                    }} className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl mt-5'>Add Goal</button>
                </div>
                <div className="col-span-9">
                <h1 className="text-2xl font-medium">Your Goals</h1>
                
                {goals.map(function(item){
                
                
                const remaining=item.targetAmount-item.savedAmount;
                
                
               return (<GoalDetails goalName={item.name} target={item.targetAmount} saved={item.savedAmount} remaining={remaining}></GoalDetails>)
                
                
                
            })}

                </div>

            </div>
            
           
         </div>

        
    </div> 
        
    
    </div>
)
}