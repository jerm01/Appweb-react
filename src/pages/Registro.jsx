import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    birthDate: '',
    email: '',
    password: '',
    role: 'Estudiante',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        name: form.name,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        birthDate: form.birthDate,
        role: form.role,
        createdAt: serverTimestamp(),
      });

      setMessage({ type: 'success', text: 'Usuario registrado correctamente' });
    } catch (err) {
      setMessage({ type: 'danger', text: 'Error: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Registro de Usuario</h2>

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Nombre</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Apellidos</label>
              <input type="text" className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Celular</label>
              <input type="tel" className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Fecha de nacimiento</label>
              <input type="date" className="form-control" name="birthDate" value={form.birthDate} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Correo electrónico</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Contraseña</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>

            <div className="mb-4">
              <label>Rol</label>
              <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                <option value="Estudiante">Estudiante</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
