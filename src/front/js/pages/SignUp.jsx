import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/SignUp.css';
import { useNavigate } from "react-router-dom";
import IconoInnovAI from '../../img/icono-innovai.png';

const SignUp = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };
        
        const success = await actions.signUp(dataToSend);
        if (success) {
            navigate('/dashboard');
        }
    };

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container d-flex flex-column min-vh-100">
            <div className="signup-container">
                <div className="signup-left">
                    <img src={IconoInnovAI} alt="Icono InnovAI" />
                </div>
                <form onSubmit={handleSignUp} className="signup-right">
                    <h4>We are <span>INNOVAI</span></h4>
                    <p>Welcome back! Log in to your account to view your favorite ideas:</p>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-user"></i>
                        </div>
                        <input type="text" id="fistName" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-address-card"></i></div>
                        <input type="text" id="lastName" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
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
                    <button type="submit" className="btn button-modern">Sign Up</button>
                </form>
            </div>
        </div>
    );

}

export default SignUp;