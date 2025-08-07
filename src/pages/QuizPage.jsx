import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getQuestionsForQuiz, saveQuizResult } from "../firebase/firestore";
import { Container, Spinner, Alert, Card, Button } from "react-bootstrap";

export default function QuizPage() {
  const { user } = useAuth();
  const { quizId, tema } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preguntas = await getQuestionsForQuiz(tema, quizId);
        if (preguntas.length === 0) {
          setError("Este quiz no tiene preguntas disponibles.");
        } else {
          setQuestions(preguntas);
        }
      } catch (err) {
        console.error("Error al cargar preguntas:", err);
        setError("Hubo un problema al cargar las preguntas.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId, tema]);

  const handleAnswer = (questionId, optionIndex) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined && selected === q.CorrectAnswerIndex) {
        correctCount++;
      }
    });

    const total = questions.length;
    const calculatedScore = (correctCount / total) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    if (user && user.uid) {
      await saveQuizResult(user.uid, {
        quizId,
        tema,
        correctCount,
        total,
        score: calculatedScore,
        timestamp: new Date(),
      });
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Preguntas del Quiz</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando preguntas...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && questions.map((q, i) => (
        <Card key={q.id} className="mb-4">
          <Card.Body>
            <Card.Title>
              {i + 1}. {q.QuestionText}
            </Card.Title>

            {q.ImageUrl && (
              <img
                src={q.ImageUrl}
                alt={`Imagen pregunta ${i + 1}`}
                className="img-fluid mb-3"
              />
            )}

            {q.Options.map((option, index) => {
              const isCorrect = q.CorrectAnswerIndex === index;
              const isSelected = selectedAnswers[q.id] === index;

              const getVariant = () => {
                if (!submitted) return isSelected ? "primary" : "outline-primary";
                if (isSelected && isCorrect) return "success";
                if (isSelected && !isCorrect) return "danger";
                if (!isSelected && isCorrect) return "success";
                return "outline-secondary";
              };

              return (
                <Button
                  key={index}
                  variant={getVariant()}
                  onClick={() => handleAnswer(q.id, index)}
                  className="d-block w-100 text-start mb-2"
                  disabled={submitted}
                >
                  {option}
                </Button>
              );
            })}
          </Card.Body>
        </Card>
      ))}

      {!submitted && questions.length > 0 && (
        <div className="text-center">
          <Button
            className="mt-3"
            variant="primary"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            Enviar Respuestas
          </Button>
        </div>
      )}

      {submitted && (
        <Alert variant="info" className="mt-4 text-center">
          ¡Terminaste! Obtuviste {score?.toFixed(2)}%
        </Alert>
      )}
    </Container>
  );
}
