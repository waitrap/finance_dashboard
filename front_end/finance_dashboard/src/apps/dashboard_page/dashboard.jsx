import "./dashboard.css";
import MainInfo from "./maininfo.jsx";
import ChartInfo from "./chartinfo.jsx";
import TableInfo from "./tableinfo.jsx";

export default function Dashboard() {

    return(
        <div className="dashboard_main">
            <div className="middle_section">
                <MainInfo/>
                <ChartInfo/>
                <TableInfo/> 
            </div>
            {/* <div className="right_section">
                <CreditCard/>
                <PieChartShow/>
            </div> */}
        </div>
    )
}