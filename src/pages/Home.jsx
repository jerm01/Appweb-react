import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">ODSQuiz</h1>
          <p className="lead">Conoce los 17 Objetivos de Desarrollo Sostenible de forma divertida y educativa</p>
          <Link className="btn btn-light btn-lg mt-3" to="/quizzes">Comenzar Quiz</Link>
        </div>
      </div>

      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>¿Qué son los ODS?</h2>
          <p>
            Los ODS son una iniciativa de la ONU con 17 metas para erradicar la pobreza, proteger el planeta y fomentar la paz.
          </p>
        </div>
        <div className="text-center">
          <img src="/img/ods-points.png" alt="Los 17 ODS" className="img-fluid rounded shadow" style={{ maxWidth: "800px" }} />
        </div>
      </div>
    </>
  );
}
