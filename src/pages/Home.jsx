import React from "react";	
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
  const [dataApiState, setDataApiState] = useState([]);
useEffect(() => {
	
	const dataApi = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/hugo/contacts");
			const data = await response.json();
			setDataApiState(data.contacts);
			console.log(data.contacts);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
	dataApi();
}, []);
	return (
		<div className="text-center mt-5">
			<h1>Contact List</h1>
			{dataApiState.map((contact) => (
				<div key={contact.id}>
					<h2>{contact.name}</h2>
					<p>{contact.email}</p>
					<p>{contact.phone}</p>
					<p>{contact.address}</p>
				</div>
			))}
		</div>
	);
}; 