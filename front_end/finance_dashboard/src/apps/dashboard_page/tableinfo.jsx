import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { config } from "../../config";

export default function TableInfo(){

    useEffect(() => {
        const tranRecordUrl = config.endPoint + config.getTransationrecord+"?limit=2";
        fetch(tranRecordUrl,{
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('x-access-token'),
            },
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if (data.length > 0){
                let transactions = Array(2).fill(null).map(() => ({
                    Category: "-",
                    Date: "-",
                    Amount: "-",
                    Description: "-"
                  }));
                for(let i=0; i<data.length; i++)
                {
                    transactions[i]["Category"] = data[i]["category"];
                    transactions[i]["Amount"] = data[i]["amount"];
                    transactions[i]["Description"] = data[i]["description"];
                    transactions[i]["Date"] = data[i]["year"]+'-'+data[i]["month"]+'-'+data[i]['day'];
                }
                setTranRecord(transactions)
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[ ]);

    const [tranRecord,setTranRecord] = useState([{
        Category:"-",
        Date:"-",
        Amount:"-",
        Description:"-"

    },{
        Category:"-",
        Date:"-",
        Amount:"-",
        Description:"-"

    }]);

    return(
        <div className="recent-transactions">
            <h2>Transations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{tranRecord[0]["Category"]}</td>
                        <td>{tranRecord[0]["Date"]}</td>
                        <td>{tranRecord[0]["Amount"]}</td>
                        <td>{tranRecord[0]["Description"]}</td>
                    </tr>
                    <tr>
                        <td>{tranRecord[1]["Category"]}</td>
                        <td>{tranRecord[1]["Date"]}</td>
                        <td>{tranRecord[1]["Amount"]}</td>
                        <td>{tranRecord[1]["Description"]}</td>
                    </tr>
                </tbody>
            </table>
            <Link className="table-more" to="/transactions">View all transactions</Link>
        </div>
    )
}