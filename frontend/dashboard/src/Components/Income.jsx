export  function Income({money,label}){
    return <div className="shadow-md rounded-xl flex bg-red-200 justify-between p-2 mt-3" >
        
        <h1 className="font-medium text-green-600">{label}</h1>
        <h1 className="text-green-600 font-bold ">+${money}</h1>
        </div>
    
    

}