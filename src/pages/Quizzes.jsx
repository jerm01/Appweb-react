import { useState } from "react";
import quizzes from "../data/quizzes";

export default function Quizzes() {
  const [quizActivo, setQuizActivo] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [score, setScore] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const handleSeleccion = (index) => {
    setRespuesta(index);
    if (index === quizActivo.preguntas[preguntaActual].respuestaCorrecta) {
      setScore(prev => prev + 1);
    }
  };

  const handleSiguiente = () => {
    setRespuesta(null);
    if (preguntaActual < quizActivo.preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    setQuizActivo(null);
    setPreguntaActual(0);
    setRespuesta(null);
    setScore(0);
    setFinalizado(false);
  };

  if (quizActivo && !finalizado) {
    const q = quizActivo.preguntas[preguntaActual];
    return (
      <div className="container mt-5">
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3">{q.pregunta}</h3>
          <div className="list-group">
            {q.opciones.map((op, i) => (
              <button
                key={i}
                className={`list-group-item list-group-item-action ${respuesta !== null ? (i === q.respuestaCorrecta ? "list-group-item-success" : i === respuesta ? "list-group-item-danger" : "") : ""}`}
                disabled={respuesta !== null}
                onClick={() => handleSeleccion(i)}
              >
                {op}
              </button>
            ))}
          </div>
          {respuesta !== null && (
            <button className="btn btn-primary mt-4" onClick={handleSiguiente}>Siguiente</button>
          )}
        </div>
      </div>
    );
  }

  if (finalizado) {
    const total = quizActivo.preguntas.length;
    const porcentaje = Math.round((score / total) * 100);
    return (
      <div className="container mt-5 text-center">
        <div className="card p-5 shadow">
          <h2>¡Quiz finalizado!</h2>
          <p><strong>Correctas:</strong> {score} / {total}</p>
          <p><strong>Puntaje:</strong> {porcentaje}%</p>
          <p>{porcentaje >= 70 ? "¡Excelente trabajo! 🌱" : "¡Sigue practicando! 💪"}</p>
          <button className="btn btn-outline-primary mt-3" onClick={reiniciar}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Elige un Quiz</h2>
      <div className="row g-4">
        {quizzes.map(q => (
          <div className="col-md-6" key={q.id}>
            <div className="card p-4 h-100 shadow-sm">
              <h4>{q.tema}</h4>
              <p>{q.descripcion}</p>
              <button className="btn btn-primary mt-2" onClick={() => setQuizActivo(q)}>Iniciar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
