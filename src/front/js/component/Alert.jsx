import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/Alert.css";

const Alert = () => {
    const { store } = useContext(Context);

    return (
        <div className={`container-alert ${store.alert.message ? "show" : ""}`}>
            {store.alert.message && (
                <div className={`alert alert-${store.alert.type}`} role="alert">
                    {store.alert.message}
                </div>
            )}
        </div>
    );
};

export default Alert;
