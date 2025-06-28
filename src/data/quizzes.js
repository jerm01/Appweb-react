const quizzes = [
  {
    id: "quiz1",
    tema: "ODS 4 - Educación",
    descripcion: "Preguntas sobre acceso a educación de calidad",
    preguntas: [
      {
        pregunta: "¿Cuál es uno de los objetivos de la ODS 4?",
        opciones: ["Educación militar obligatoria", "Educación de calidad", "Educación solo para adultos", "Prohibir escuelas rurales"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué edad marca el objetivo de educación primaria gratuita?",
        opciones: ["3 años", "18 años", "6 años", "12 años"],
        respuestaCorrecta: 3
      }
    ]
  },
  {
    id: "quiz2",
    tema: "ODS 13 - Acción por el clima",
    descripcion: "Test sobre cambio climático y sostenibilidad",
    preguntas: [
      {
        pregunta: "¿Cuál de estas es una causa del cambio climático?",
        opciones: ["Reciclaje", "Energía solar", "Uso excesivo de combustibles fósiles", "Compostaje"],
        respuestaCorrecta: 2
      }
    ]
  }
];

export default quizzes;
