import { useNavigate } from "react-router-dom"


export function SignOut({image,menuName}){
    const Navigate=useNavigate()
    
    return <div className="flex ml-2 p-2 mt-3">
         {image}
       <a href="/signin" className="ml-5" onClick={function(){
           
            localStorage.removeItem("token")
            localStorage.removeItem('name')
       }}>Sign Out</a>
    </div>
    
    



}