import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsForQuiz } from '../firebase/firestore';

export default function QuizPage() {
  const { id } = useParams(); // id del quiz

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const preguntas = await getQuestionsForQuiz(id);
      setQuestions(preguntas);
    };
    fetchData();
  }, [id]);

  const handleOptionClick = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Preguntas del Quiz</h2>

      {questions.length === 0 && (
        <div className="alert alert-danger">Este quiz no tiene preguntas disponibles.</div>
      )}

      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4 p-3 border rounded shadow-sm">
          <p><strong>Pregunta {idx + 1}:</strong> {q.QuestionText}</p>
          <div className="d-flex flex-column">
            {q.Options?.map((option, i) => {
              const selected = selectedAnswers[q.id] === i;
              const isCorrect = i === q.CorrectAnswerIndex;

              const getButtonClass = () => {
                if (!submitted) {
                  return selected ? 'btn btn-outline-primary mb-2' : 'btn btn-light mb-2';
                }

                if (selected && isCorrect) return 'btn btn-success mb-2';
                if (selected && !isCorrect) return 'btn btn-danger mb-2';
                if (isCorrect) return 'btn btn-success mb-2';
                return 'btn btn-light mb-2';
              };

              return (
                <button
                  key={i}
                  className={getButtonClass()}
                  onClick={() => handleOptionClick(q.id, i)}
                  disabled={submitted}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && questions.length > 0 && (
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Enviar respuestas
        </button>
      )}

      {submitted && (
        <div className="alert alert-info mt-4">
          Has finalizado el quiz. Puedes revisar tus respuestas arriba.
        </div>
      )}
    </div>
  );
}
