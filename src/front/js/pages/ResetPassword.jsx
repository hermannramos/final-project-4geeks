// src/components/ResetPassword.js
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../../styles/Login.css';

const ResetPassword = () => {
    const { actions } = useContext(Context);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const token = searchParams.get("token");
        const response = await actions.resetPassword(token, newPassword);
        if (response.success) {
            navigate("/login");
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <div className="login-container">
                <form onSubmit={handleResetPassword} className="login-right">
                    <h4>Restablecer Contraseña</h4>
                    <p>Ingresa tu nueva contraseña:</p>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-lock"></i></div>
                        <input type={showPassword ? "text" : "password"} id="newPassword" value={newPassword} placeholder="Nueva contraseña" onChange={(e) => setNewPassword(e.target.value)} required />
                        <div className="icon-password" onClick={toggleShowPassword}>
                            <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                        </div>
                    </div>
                    <button type="submit" className="btn button-modern">Restablecer Contraseña</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
