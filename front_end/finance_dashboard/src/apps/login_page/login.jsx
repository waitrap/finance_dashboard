import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import {config} from "../../config.js";


export default function Login() {

    const navigate = useNavigate();
    // ログインする前に、token検査を行う、tokenがあれば、直接dashboardに入る
    useEffect(() => {
        const token = localStorage.getItem('x-access-token');
        if (token) {
           
            fetch(config.endPoint + config.checkLoginUrl, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('x-access-token'),
                },
            }).then((res) => {
                if (res.ok) {
                    navigate("/dashboard");
                }
            });
        }
    }, []);

    // ユーザー名とパスワードを収集し、バックエンドに送信する
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [action, setRegister] = useState("login"); // login: ログイン、register: 登録
    const [logError, setLogError] = useState(false);

    const handleSubmit =  (event) => {
        event.preventDefault();

        const url = config.endPoint + `/${action}`;
        
        fetch(url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                setLogError(true);  
                throw new Error(`Failed to ${action}`+res.status);
            }
        }).then((data) => {
            if (action === "login") {
                localStorage.setItem("x-access-token", data.token);
                navigate("/dashboard");
            } else {
                alert("Registration Successful. Please login to continue.");
                setRegister("login");
            }
        }).catch((error) => {
            console.error(error);
        })
    };

    return (

        <>

        <div className="body">
            <div className="container">
                <h1>{action === "login" ? "Login to your account 😊" : "Register your account 😊"}</h1>

                <div className="divider">
                    <div className="line"></div>
                </div>
                {logError && <p className="error-message">Invalid username or password</p>}
                <div className="form">

                    <label>Email:</label>
                    <div className="custome-input">
                        <input type="email" value={username} placeholder="Your Email" onChange={(e) => setUsername(e.target.value)} />
                        <i className="bx bx-at"></i>
                    </div>

                    <label>Password:</label>
                    <div className="custome-input">
                        <input type="password" value={password} placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
                        <i className="bx bx-lock-alt"></i>
                    </div>

                    <button className="submit" onClick={handleSubmit}>{action === "login" ? "Login" : "Register"}</button>

                    <div className="links">
                        <p>{ action === "login" ? "Don't have an account?" : "Already have an account?" } </p>
                        { action === "login" && <p className="link" onClick={() => setRegister("register")}>Register account</p>}
                        { action === "register" && <p className="link" onClick={() => setRegister("login")}>login account</p>}
                    </div>
                </div>
            </div>
        </div>

        </>
    )
    
}