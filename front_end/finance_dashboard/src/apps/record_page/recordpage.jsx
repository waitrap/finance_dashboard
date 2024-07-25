import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./recordpage.css"
export default function RecordPage(){
  
  // /outcome デフォルトで表示する
  const navigate = useNavigate();
  useEffect(()=>{
    navigate("/record/outcome",{replace: true})
  },[])
 

  const [tableKind,setTableKind] = useState("outcome")
  


  return(
    <div　className="record_container">
      <div className="button_container" >
        <button className={`outcome_button ${tableKind === "outcome" ? "choose" : ""}`} >
        outcome
        </button>
        <button className={`income_button ${tableKind === "income" ? "choose" : ""}`}>
        income
        </button>
      </div>
      
      <Outlet/>
    
    </div>
  )
}