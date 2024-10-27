export  function TotalExpense({money}){
    return <div className=" rounded-xl flex shadow-md  justify-center p-5 mt-1 bg-red-200" >
        
        <h1 className=" font-medium text-2xl ">Total Expense:</h1>
        <h1 className="font-medium text-2xl text-red-600">-${money}</h1>
        </div>
    
    

}