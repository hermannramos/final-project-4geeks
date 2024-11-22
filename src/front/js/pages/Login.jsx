import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Login.css';
import IconoInnovAI from '../../img/icono-innovai.png';

const Login = () => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleLogIn = async (e) => {
        e.preventDefault();
        const dataToSend = {email, password};
        const success = await actions.logIn(dataToSend);
        if (success) {
            navigate('/dashboard'); 
        } else {
            navigate('/login'); 
        }
    }
    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container d-flex flex-column min-vh-100" id="container">
            <div className="login-container">
                <div className="login-left">
                    <img src={IconoInnovAI} alt="Icono InnovAI" />
                </div>
                <form onSubmit={handleLogIn} className="login-right">
                    <h4>We are <span>INNOVAI</span></h4>
                    <p>Welcome back! Log in to your account to view your favorite ideas:</p>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                        <input type="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-lock"></i></div>
                        <input type={showPassword ? "text" : "password"}  id="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <div className="icon-password" onClick={handlePassword}>
                            <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                        </div>
                    </div>
                    <Link to="/request-password" className="reset-password-link">¿Olvidaste tu contraseña?</Link>
                    <button type="submit" className="btn button-modern">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;