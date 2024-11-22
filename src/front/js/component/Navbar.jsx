import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import logoInnovAI from '../../img/logo-entero.png';
import '../../styles/navbar.css';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [darkMode, setDarkMode] = useState(false);

	const handleLogIn = () => {
		if (store.isLoged) {
			actions.logOut();
			navigate('/');
		} else {
			navigate('/login');
		}
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle('dark-mode');
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container-fluid">
				<div className="logo-container">
					<Link className="navbar-brand" to="/">
						<img src={logoInnovAI} alt="InnovAI Logo" height="40" />
					</Link>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="menu ms-auto">
						<ul className="navbar-nav d-flex flex-row">
							<li className="nav-item px-3">
								<Link className="nav-link" to="/advisor">ADVISOR</Link>
							</li>
							<li className="nav-item px-3">
								<Link className="nav-link" to="/news">NEWS</Link>
							</li>
							<li className="nav-item px-3">
								<Link className="nav-link" to="/converter">CONVERTER</Link>
							</li>
						</ul>
					</div>
					<div className="dropdown d-flex align-items-center">
						<button className="btn btn-outline-light dropdown-toggle me-2" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fas fa-user"></i>
						</button>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
							<li>
								<Link className="dropdown-item" to={store.isLoged ? '/dashboard' : '/login'}>
									{store.isLoged ? 'Dashboard' : 'Log In'}
								</Link>
							</li>
							<li>
								{store.isLoged ? (
									<span className="dropdown-item" onClick={handleLogIn}>Log Out</span>
								) : (
									<Link className="dropdown-item" to="/signup">Sign Up</Link>
								)}
							</li>
						</ul>

						{/* Botón de modo oscuro como toggle */}
						<div className="form-check form-switch">
							<input
								className="form-check-input"
								type="checkbox"
								id="darkModeToggle"
								checked={darkMode}
								onChange={toggleDarkMode}
							/>
							<label className="form-check-label" htmlFor="darkModeToggle">
								{darkMode ? (
									<i className="fas fa-sun"></i> // Icono de sol
								) : (
									<i className="fas fa-moon"></i> // Icono de luna
								)}
							</label>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}