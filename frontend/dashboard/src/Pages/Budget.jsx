import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { useNavigate } from "react-router-dom"

export function Budget(){
    const [budget,setBudget]=useState(0)
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    useEffect(()=>{
        async function setBudget(){
            await axios.post('http://localhost:3000/api/v1/user/setBudget',{
                budget:budget
            },{
                headers:{Authorization:`Bearer ${token}`}
            })
        }
        setBudget()
    },[budget])
    return <div className="bg-pink-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-red-200 w-80 text-center p-2 h-max px-4">
        <h1 className="text-2xl p-4 font-medium">Set your monthly budget</h1>
        <h3>So that we can alert you when you are near to your budget.</h3>
        <p className="font-light">You can also change it later</p>
        <input  onChange={function(e){
           setBudget(e.target.value)
            
        }} className="p-4 font-medium m-2" min={10} type="number" required />
        <Button onClick={function(){
            navigate('/dashboard')
            
        }} label={"Confirm"}></Button>

        </div>
        
        </div>
        
    </div>
}