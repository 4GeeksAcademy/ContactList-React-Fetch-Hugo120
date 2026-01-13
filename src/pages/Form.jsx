// Import necessary components from react-router-dom and other parts of the application.
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [updateContact, setUpdateContact] = useState(false);
  const params = useParams();
  const idContact = params.theId;
  const navigate = useNavigate();
  useEffect(() => {
    if (idContact) {
      setUpdateContact(true);
    }
    else {
      setUpdateContact(false);
    }
  }, [idContact]);

  const saveContact = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/hugo/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const editContact = async (idContact) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/hugo/contacts/${idContact}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateContact) {
      const response = await editContact(idContact);
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error al editar el contacto");
      }
    }else {  
    const response = await saveContact();
    if (response.ok) {
      navigate("/");
    } else {
      console.error("Error al guardar el contacto");
    }}
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold text-primary">
                {updateContact ? "Edit Contact" : "Add a new contact"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Save Contact
                  </button>
                </div>
              </form>

              <Link to="/"><button type="button" className="btn btn-secondary btn-lg">
                Volver al Menú
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
