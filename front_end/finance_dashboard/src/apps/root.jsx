import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./root.css";

// ウェブサイトのメインフレーム
export default function Root() {
    // 直接/dashboardにアクセスするのを防止
    const token = localStorage.getItem("x-access-token");
    if (!token) {
        window.location.href = "/";
    }

    const sideItems = ["Dashboard", "Record", "Input"];
    const sideLinks = ["/dashboard", "/record", "/input"];
    const sideIcons = ["dashboard", "insights", "edit_note"];
    
    const url = window.location;
    const pathname = url.pathname; 
    let nowLinksindex = 0;
    for(let i=0;i<sideLinks.length;++i){
        if (pathname===sideLinks[i]){
            nowLinksindex = i;
        }
    }
    const [active, setActive] = useState(nowLinksindex);

    const handLinkClick = (index) => {
        setActive(index);
    }
    
    const logoutClick = () => {
        localStorage.removeItem("x-access-token");
        window.location.href = "/";
    }

    return(
        <div className="root">
            <div className="root_container">
                {/* sidebar section */}
                <aside>
                    <div className="logo">
                        <img src="/public/finance.png" alt="logo" />
                        <h2>Finance</h2>
                    </div>

                    <div className="sidebar">
                        {
                            sideIcons.map((item, index) => (
                                <Link className={`link ${active === index && "active"}`} key={index}
                                onClick={() => handLinkClick(index)} to={`${sideLinks[index]}`}>
                                    <span className="material-symbols-outlined">{item}</span>
                                    <h3>{sideItems[index]}</h3>
                                </Link>
                            ))
                        }
                        {/*user item*/}
                        <div className="logout" onClick={()=>logoutClick()}>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <h3>logout</h3>
                        </div>
                    </div>
                </aside>
                <Outlet />
            </div>
        </div>
    )

}