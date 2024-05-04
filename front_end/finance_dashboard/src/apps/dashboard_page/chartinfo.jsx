import { config } from "../../config"
import { useEffect, useState } from "react";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from 'recharts';

export default function ChartInfo() {

    const today = new Date();
    const year = today.getFullYear();
    const month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let chart_data =month_list.map((month)=>{
        return {
            name: month,
            income: 0,
            outcome: 0,
        }
    });
    
    const [chartData, setChartData] = useState(chart_data);
    const [selectYear, setSelectYear] = useState(year);

    useEffect(() => {
        
        const incomeListUrl = config.endPoint + config.monthIncomeListUrl+`?year=${selectYear}`; 
        const outcomeListUrl = config.endPoint + config.monthOutcomeListUrl+`?year=${selectYear}`;

        Promise.all([
            fetch(incomeListUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            }),
            fetch(outcomeListUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            })
        ]).then((responses) => {
            return Promise.all(responses.map((response) => response.json()));
        }).then((data) => {
            chart_data = month_list.map((month,index)=>{
                return {
                    name: month,
                    income: data[0][index],
                    outcome: data[1][index]
                }
            });
            setChartData(chart_data);
        })
    },[selectYear]);

    const selectChange = (event) => {
        setSelectYear(event.target.value);
    }
    return(
        <div className="chart" >
            <div className="chart_title">
                <h2 style={{fontWeight: "bold"}}>Analytics</h2>
                <div className="legend">
                    <svg width={12} height={12}>
                        <circle style={{fill: "#8884d8"}} cx="6" cy="6"
                        r="5"></circle>
                    </svg>
                    <p>Income</p>
                </div>
                <div className="legend">
                    <svg width={12} height={12}>
                        <circle style={{fill: "#82ca9d"}} cx="6" cy="6"
                        r="5"></circle>
                    </svg>
                    <p>Outcome</p>
                </div>
                <select onChange={selectChange}>
                    <option value={year}>{year}</option>
                    <option value={year-1}>{year-1}</option>
                    <option value={year-2}>{year-2}</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={chartData}
            margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5
            }}
            >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={{ stroke: "transparent" }} axisLine={{ stroke: "transparent"}}/>
            <YAxis tickLine={{ stroke: "transparent" }} axisLine={{ stroke: "transparent" }} />
            <Tooltip />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="outcome" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    )
}