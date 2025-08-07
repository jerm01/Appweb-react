
import { collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getQuestionsForQuiz = async (tema, quizId) => {
  try {
    const ref = collection(db, "temas", tema, "quizzes", quizId, "questions");
    const snapshot = await getDocs(ref);

    const preguntas = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        QuestionText: data.QuestionText || "Pregunta sin texto",
        Options: Array.isArray(data.Options) ? data.Options : [],
        CorrectAnswerIndex: typeof data.CorrectAnswerIndex === "number" ? data.CorrectAnswerIndex : 0,
        Points: data.Points ?? 1,
        ImageUrl: data.ImageUrl || ""
      };
    });

    return preguntas;
  } catch (error) {
    console.error("🔥 Error en getQuestionsForQuiz:", error);
    return [];
  }
};


export async function saveQuizResult(userId, result) {
  try {
    const resultsRef = collection(db, "users", userId, "results");
    await addDoc(resultsRef, result);
    console.log("✅ Resultado guardado correctamente");
  } catch (error) {
    console.error("❌ Error al guardar resultado:", error);
  }
}