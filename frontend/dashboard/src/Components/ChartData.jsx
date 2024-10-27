import { Line } from "react-chartjs-2";
import { Chart as ChartJS,
    LineElement,CategoryScale,LinearScale,PointElement,
    plugins,
    scales
 } from "chart.js";
 ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,plugins,scales)
export function ChartData({incomeAmount,expenseAmount}){
    const dateLabel = Array.from(new Set([...incomeAmount.date, ...expenseAmount.date])).sort();
    console.log(incomeAmount.date);
    

  // Map income and expense data to the combined date labels
//   const incomeData = dateLabel.map((date) => {
//     const index = incomeAmount.date.indexOf(date);
//     return index !== -1 ? incomeAmount.income[index] : 0;
//   });

//   const expenseData = dateLabel.map((date) => {
//     const index = expenseAmount.date.indexOf(date);
//     return index !== -1 ? expenseAmount.expense[index] : 0;
//   });
    const data={
        labels:incomeAmount.date,
        datasets:[{
            label:"Income",
            data:[],
            tension:0.4,
            backgroundColor:'red'

        },
        {
            label:"Expense",
            data:[],
            tension:0.4,
            backgroundColor:'purple'

        }]
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