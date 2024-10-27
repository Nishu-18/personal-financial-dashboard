export  function MinMax({min,max}){
    return <div className=" rounded-xl flex shadow-md  justify-between p-2 mt-1 bg-red-200" >
        
        <h1 className="font-xl text-gray-600 ">${min}</h1>
        <h1 className="font-medium text-gray-600">${max}</h1>
        </div>
    
    

}