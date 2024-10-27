export  function Label({labelName}){
    return <div className=" rounded-xl flex  justify-between p-2 mt-3" >
        
        <h1 className="font-medium ">Min</h1>
        <h1 className="text-xl font-bold ">{labelName}</h1>
        <h1 className="font-medium ">Max</h1>
        </div>
    
    

}