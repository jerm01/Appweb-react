export default function About() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Sobre ODSQuiz</h2>
      <p className="lead text-center mb-5">
        Una plataforma educativa para conocer los Objetivos de Desarrollo Sostenible (ODS) de forma interactiva.
      </p>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="/img/ods-info.png"
            alt="ODS Info"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4>¿Qué es ODSQuiz?</h4>
          <p>
            Es una aplicación web diseñada para promover la educación ambiental y social a través de quizzes interactivos
            basados en los 17 Objetivos de Desarrollo Sostenible propuestos por la ONU.
          </p>
          <p>
            Cada cuestionario está diseñado para reforzar el aprendizaje y fomentar la conciencia en temas clave como
            igualdad, clima, paz y justicia.
          </p>
        </div>
      </div>

      <div className="row align-items-center flex-md-row-reverse">
        <div className="col-md-6">
          <img
            src="/img/team-collab.png"
            alt="Equipo"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4>¿Quiénes somos?</h4>
          <p>
            Este proyecto fue desarrollado como parte de una iniciativa académica en pro del desarrollo sostenible.
            Nuestro objetivo es ofrecer una experiencia lúdica y educativa que motive a estudiantes, docentes y ciudadanos
            a involucrarse con los ODS.
          </p>
        </div>
      </div>
    </div>
  );
}
