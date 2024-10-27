export  function Money({label,money}){
    return <div className="bg-red-200 shadow-md rounded-md p-5 w-200 ml-5 ">
        
        <h1 className="font-medium">{label}</h1>
        <h1 className="font-bold text-2xl">${money}</h1>
        </div>
    
    

}