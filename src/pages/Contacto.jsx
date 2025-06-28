import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente (solo diseño placeholder)");
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contáctanos</h2>
      <p className="text-center mb-5">
        ¿Tienes dudas, sugerencias o comentarios? ¡Queremos escucharte!
      </p>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form className="card shadow p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                name="mensaje"
                className="form-control"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
