import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [dataContact, setDataContact] = useState([]);

	useEffect(() => {

		const getDataApiContact = async () => {
			try {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/hugo/contacts");
				const data = await response.json();
				setDataContact(data.contacts);
				console.log(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		getDataApiContact();
	}, []);

	const deleteContact = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/hugo/contacts/${id}`,
				{ method: "DELETE" });
			if (response.ok) {
				setDataContact(dataContact.filter(contact => contact.id !== id));
			}
		} catch (error) {
			console.error("Error deleting contact:", error);
		}
	};

	return (
		<div className="container py-5">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h1 className="fw-bold">Contact List</h1>
				<Link to="/Form" className="btn btn-success">
					Add new contact
				</Link>
			</div>

			{dataContact.length === 0 ? (
				<p className="text-muted text-center">No contacts found.</p>
			) : (
				<ul className="list-group">
					{dataContact.map((dataApi) => (
						<li
							key={dataApi.id}
							className="list-group-item d-flex align-items-center justify-content-between py-3"
						>
							<div className="d-flex align-items-center w-100">
								<img
									src={`https://i.pravatar.cc/100?u=${dataApi.id}`}
									alt={dataApi.name}
									className="rounded-circle me-3"
									style={{ width: "80px", height: "80px", objectFit: "cover" }}
								/>
								<div className="flex-grow-1 text-start">
									<h5 className="mb-1">{dataApi.name}</h5>
									<p className="mb-0 text-muted">
										<i className="bi bi-envelope"></i> {dataApi.email}
									</p>
									<p className="mb-0 text-muted">
										<i className="bi bi-telephone"></i> {dataApi.phone}
									</p>
									<p className="mb-0 text-muted">
										<i className="bi bi-geo-alt"></i> {dataApi.address}
									</p>
								</div>

								<div className="text-end">
									<Link
										to={`/Form/${dataApi.id}`}
										className="btn btn-outline-primary btn-sm me-2"
									>
										<i className="bi bi-pencil"></i>
									</Link>
									<button
										className="btn btn-outline-danger btn-sm"
										data-bs-toggle="modal" data-bs-target="#staticBackdrop"

									>
										<i className="bi bi-trash"></i>
									</button>
									<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
										<div class="modal-dialog">
											<div class="modal-content">
												<div class="modal-header">
													<h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar contacto</h1>
													<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div class="modal-body">
													<h5>¿Estás seguro que deseas eliminar este contacto?</h5>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
													<button type="button" onClick={() => deleteContact(dataApi.id)} class="btn btn-primary" data-bs-dismiss="modal">Si estoy seguro</button>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</li>
					))}
				</ul>
			)}

		</div>
	);
}; 