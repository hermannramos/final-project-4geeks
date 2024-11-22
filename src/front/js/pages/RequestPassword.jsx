// src/components/RequestPasswordReset.js
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css';

const RequestPassword = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleRequestPassword = async (e) => {
        e.preventDefault();
        const response = await actions.requestPasswordReset(email);
        if (response.success) {
            navigate("/login");
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <form onSubmit={handleRequestPassword} className="login-right">
                    <h4>Restablecer Contraseña</h4>
                    <p>Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña:</p>
                    <div className="floating-label">
                        <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                        <input type="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn button-modern">Enviar Enlace</button>
                </form>
            </div>
        </div>
    );
};

export default RequestPassword;
