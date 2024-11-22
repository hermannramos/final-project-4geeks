import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Body } from "../component/Body.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
	<Body />
	);
};
