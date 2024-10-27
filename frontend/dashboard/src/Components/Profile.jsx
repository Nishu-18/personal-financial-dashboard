import React from "react"
import profileImage from '../assets/profile.png'; 
export function Profile({username}){
    
   
    return <div>
        <img src="" alt="" />
        <div className="flex">
        <img className="rounded-full w-15 h-12 mr-5"src={profileImage} alt="" />
        <div>
        <h1 className="font-bold text-xl">{username}</h1>
        <h5 className="f text-black-100">Your Money</h5>
        </div>
            
            

        </div>
     
        
    </div>
}