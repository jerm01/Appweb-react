import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getQuestionsForQuiz = async (tema, quizId) => {
  try {
    const questionsRef = collection(db, "temas", tema, "quizzes", quizId, "questions");
    const snapshot = await getDocs(questionsRef);

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        QuestionText: data.QuestionText,
        options: data.options,
        correctIndex: data.CorrectAnswerIndex, // ← usa índice, no respuesta literal
      };
    });
  } catch (error) {
    console.error("❌ Error al obtener preguntas:", error);
    return [];
  }
};
