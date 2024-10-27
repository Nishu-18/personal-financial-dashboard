export  function Expense({money,label}){
    return <div className="shadow-md rounded-xl flex bg-red-200 justify-between p-2 mt-3" >
        
        <h1 className="font-medium text-red-600">{label}</h1>
        <h1 className="text-red-600 font-bold ">-${money}</h1>
        </div>
    
    

}