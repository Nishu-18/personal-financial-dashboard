import { Line } from "react-chartjs-2";
import { Chart as ChartJS,
    LineElement,CategoryScale,LinearScale,PointElement,
    plugins,
    scales
 } from "chart.js";
 ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,plugins,scales)
export function ChartData({incomeAmount,expenseAmount}){
  
const dates = [...new Set([...incomeAmount.map(d => d.date), ...expenseAmount.map(d => d.date)])].sort();
const updatedDates=[]
for(let i=0;i<dates.length;i++){
    const newDate=new Date(dates[i])
        const month=newDate.getMonth()+1
        const date=newDate.getDate()+"/"+month+"/"+newDate.getFullYear()

    updatedDates.push(date)
}



const incomeAmounts = dates.map(date => {
  const income = incomeAmount.find(d => d.date === date);
  return income ? income.amount : 0;
});

const expenseAmounts = dates.map(date => {
  const expense = expenseAmount.find(d => d.date === date);
  return expense ? expense.amount : 0;
});


console.log(updatedDates);



    
    
    
    const data={
        labels:updatedDates,
        datasets:[{
            label:"Income",
            data:incomeAmounts,
            tension:0.4,
            backgroundColor:'red'

        },
        {
            label:"Expense",
            data:expenseAmounts,
            tension:0.4,
            backgroundColor:'purple'

        }
        ]
    }
    const options={
        plugins:{
            legend:true
        },
        scales:{
            y:{

            }
        },
        

    }
    return <div>
        <h1 className="font-md text-2xl">All Transactions</h1>
        <div className="bg-red-200 m-3">
            <Line data={data} options={options} className="shadow-md"></Line>
        </div>
        
    </div>
}