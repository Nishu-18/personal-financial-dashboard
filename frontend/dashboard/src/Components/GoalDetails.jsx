export function GoalDetails({goalName,target,saved,remaining}){

    
    return <div className="flex bg-red-200 p-5 rounded-md mt-5 justify-between">
    <div>
        <div className="font-bold">
            {goalName}

        </div>
        <div className="font-thin flex justify-between gap-20">
            <div>
          <h1>Target Amount: ${target+"  "}</h1>  
            </div>
            <div>
            <h1>Saved Amount:  ${saved+" "}</h1>  
           

            </div>

            <div>
            <h1>Remaining Amount:  ${remaining+" "}</h1>

            </div>
            
            
        </div>
        
       <div className="flex justify-center mt-4">
       <progress className="mt-1 mr-3"  max={target} value={saved}></progress>
       <h2>{Math.floor((saved/target)*100)+" %"}</h2>


       </div>
      

       
        
        
    </div>
    <div>
       <button id="mybutton"className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-5">Delete</button>
    </div>
    </div>
}