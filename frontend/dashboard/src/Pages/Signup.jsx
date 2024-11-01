import { useState,useEffect } from "react"
import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [name, setName] = useState("");
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    return <div className="bg-pink-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-red-200 w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="nishchal@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
           <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              name,
              password
            }).catch(function(err){
              if(err.response){
                if(err.response.status==401){
                  alert("User Already Exists")
                }
                
              }
            });
            
             
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("name",name)
            navigate("/dashboard")
          }} label={"Sign up"} />
        </div> 
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}