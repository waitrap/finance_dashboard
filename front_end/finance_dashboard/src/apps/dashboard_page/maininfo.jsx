import {config} from "../../config.js";     
import { useEffect, useState } from "react";

export default function MainInfo() {

    const [income, setIncome] = useState(0);
    const [outcome, setOutcome] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        Promise.all([
            fetch(config.endPoint + config.dayIncomeUrl+`?year=${year}&month=${month}&day=${day}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            }),
            fetch(config.endPoint + config.dayOutcomeUrl+`?year=${year}&month=${month}&day=${day}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            }),
            fetch(config.endPoint + config.dayBalanceUrl+`?year=${year}&month=${month}&day=${day}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            })
        ]).then(([res1, res2, res3]) => {
            if (res1.ok && res2.ok && res3.ok) {
                return Promise.all([res1.json(), res2.json(), res3.json()]);
            } else {
                throw new Error();
            }
        }).then(([income, outcome, balance]) => {
            setIncome(income);
            setOutcome(outcome);
            setBalance(balance);
        }).catch((err) => {
            console.log(err);
        })
    },[]);

    return(
        <div className="main-info">
        <h1>Welcome Back</h1>
        <h3>Here's what's happening with your money today</h3>

        <div className="analyse">
            <div className="income">
                <img src="/public/up.png" alt="income"/>
                <div className="info">
                    <h3>Income</h3>
                    <h2>{'¥ '+income}</h2>   
                </div>
                <div className="income_rate">
                    <p>+0.00%</p>
                </div>
            </div> 
            <div className="outcome">
                <img src="/public/down.png" alt="outcome"/>
                <div className="info">
                    <h3>Outcome</h3>
                    <h2>{'¥ '+outcome}</h2>   
                </div>
                <div className="outcome_rate">
                    <p>+0.00%</p>
                </div>
            </div>
            <div className="balance">
                <img src="/public/balance.png" alt="balance"/>
                <div className="info">
                    <h3>Balance</h3>
                    <h2>{'¥ '+balance}</h2>   
                </div>
                <div className="balance_rate">
                    <p>+0.00%</p>
                </div>
            </div>
        </div>
        </div>   
    )
}
