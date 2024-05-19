import { useState } from "react";
import { config } from "../../config";
import "./inputpage.css"
export default function InputPage(){
    
    const [inputKind,setInputKind] = useState("outcome"); // ページのタイプ

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    const [yearValue,setYearValue] = useState(year);
    const [monthValue,setMonthValue] = useState(month);
    const [dayValue,setDayValue] = useState(day);

    const [amountValue,setAmountValue] = useState(0);
    const [categoryValue,setCategoryValue] = useState("");
    const [noteValue,setNoteValue] = useState("");
    
    const onHandleSubmit = (event) => {
        event.preventDefault();

        const url = config.endPoint + `/input/${inputKind}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('x-access-token'),
            },
            body: JSON.stringify({
                year: yearValue,
                month: monthValue,
                day: dayValue,
                amount: amountValue,
                ...(inputKind==="outcome" && { category: categoryValue}),
                description: noteValue
            }),
        })
    }

    return(
        <div className="input-container">
            <div className="date-input">
                <div className="year-input">
                    <h3>Year</h3>
                    <input name="year"　required onChange={(e) => setYearValue(e.target.value)} type="number" value={yearValue}/>
                </div>
                <div className="month-input">
                     <h3>Month *</h3>
                    <input name="month" required onChange={(e) => setMonthValue(e.target.value)} type="number" value={monthValue}/>
                </div>
                <div className="day-input">
                    <h3>Day *</h3>
                    <input name="day" required onChange={(e) => setDayValue(e.target.value)} type="number" value={dayValue}/>
                </div>
            </div>
            <div className="amount-input">
                <h3>Amount *</h3>
                <input name="amount" required type="number" onChange={(e) => setAmountValue(e.target.value)} value={amountValue}/>
            </div>
            { inputKind ==="outcome" &&
                <div className="category-input">
                    <h3>Category *</h3>
                    <input name="category" required type="text" onChange={(e) => setCategoryValue(e.target.value)} value={categoryValue}/>
                </div>
            }
            <div className="description-input">
                <h3>Description</h3>
                <textarea name="description" rows={4} cols={50} placeholder="input description" onChange={(e) => setNoteValue(e.target.value)} value={noteValue} />
            </div>
            <button className="submit-button" onClick={onHandleSubmit} type="submit">Submit</button>

            <div className="input-button">
                <button className="outcome-button"  style={{backgroundColor: inputKind === "outcome" ? "#5222fd" : ""}} onClick={() => setInputKind("outcome") }>Outcome</button>
                <button className="income-button"  style={{backgroundColor: inputKind === "income" ? "#5222fd" : ""}} onClick={() => setInputKind("income")}>Income</button>
            </div>
        </div>
    )
}