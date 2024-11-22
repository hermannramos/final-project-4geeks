import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/Converter.css';

const Converter = () => {
    const { store, actions } = useContext(Context);
    const [fromCurrency, setFromCurrency] = useState("EUR");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState("");

    const handleConvert = async (e) => {
        e.preventDefault();
        if (fromCurrency && toCurrency && amount) {
            await actions.getConvert(fromCurrency, toCurrency, amount);
        } else {
            actions.showAlert("Por favor, completa todos los campos", "danger");
        }
    };

    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    const currencies = [
        { code: "EUR", name: "Euro", flag: "https://flagcdn.com/w40/eu.png" },
        { code: "USD", name: "Dólar Estadounidense", flag: "https://flagcdn.com/w40/us.png" },
        { code: "GBP", name: "Libra Esterlina", flag: "https://flagcdn.com/w40/gb.png" },
        { code: "JPY", name: "Yen Japonés", flag: "https://flagcdn.com/w40/jp.png" },
        { code: "AUD", name: "Dólar Australiano", flag: "https://flagcdn.com/w40/au.png" },
    ];

    return (
        <div className="container convert-container d-flex flex-column min-vh-100">
            <h1>Currency Converter</h1>
            <p className="text-center">Make a new currency convertion now!</p>
            <hr />
            <div className="currency-converter">
                <form onSubmit={handleConvert} className="converter-form">
                    <div className="input-row">
                        <div className="form-group">
                            <label htmlFor="amount">Importe</label>
                            <input type="number" id="amount" className="input-amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Cantidad" required />
                        </div>
                        <div className="form-group with-flag">
                            <label htmlFor="fromCurrency">De</label>
                            <div className="select-container">
                                <img src={currencies.find((cur) => cur.code === fromCurrency)?.flag} alt={fromCurrency} className="currency-flag-left" />
                                <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="currency-select">
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="button" className="swap-btn" onClick={swapCurrencies} aria-label="Intercambiar monedas"><i class="fas fa-exchange-alt"></i></button>
                        <div className="form-group with-flag">
                            <label htmlFor="toCurrency">A</label>
                            <div className="select-container">
                                <img src={currencies.find((cur) => cur.code === toCurrency)?.flag} alt={toCurrency} className="currency-flag-left" />
                                <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="currency-select">
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="result-and-button">
                        <div className="conversion-result">
                            <div className="conversion-line">
                                <h3>{amount} {fromCurrency}</h3>
                                <p>→</p>
                                <h3>{store.convertedAmount} {toCurrency}</h3>
                            </div>
                            <p className="rate">Tasa: {store.conversionRate}</p>
                        </div>
                        <button type="submit" className="convert-btn">Convertir</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Converter;