export function IncomeDetail({IncomeType,amount,date,details,func,transactionID}){
    return <div className="flex bg-red-200 p-5 rounded-md mt-5 justify-between">
        <div>
            <div className="font-bold">
                {IncomeType}

            </div>
            <div className="font-thin flex justify-between gap-4">
                <div>
                ${amount+"  "}
                </div>
                <div>
                {date+" "}

                </div>

                <div>
                {details}

                </div>
                
                
            </div>
            
        </div>
        <div>
           <button id="mybutton" data-id={transactionID}  onClick={func} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-5">Delete</button>
        </div>
    </div>

}