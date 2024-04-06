import "./login.css";
import {config} from "../../config.js";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    // まず、外部スタイルシートを読み込む
    
    // ユーザー名とパスワードを収集し、バックエンドに送信する
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logError, setLogError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit =  (event) => {
        event.preventDefault();

        const loginUrl = config.endPoint + "/login";
        fetch(loginUrl, {
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
                return Response.json();
            } else {
                setLogError(true);  
                throw new Error("Failed to login."+res.status);
            }
        }).then((data) => {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        }).catch((error) => {
            console.error(error);
        })
    };

    return (

        <>

        <div className="body">
            <div className="container">
                <h1>Login to your account 😊</h1>

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

                    <button className="submit" onClick={handleSubmit}>Login</button>

                    <div className="links">
                        <a href="#">Reset Password</a>
                        <a href="#">Don't have an account?</a>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
    
}