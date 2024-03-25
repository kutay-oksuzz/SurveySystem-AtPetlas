import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function TextQuestion() {
  const { dispatch } = useQuiz();

  return (
    <>
      <h5>Cevabınızı buraya yazın...</h5>
      <textarea
        required
        onChange={() => dispatch({ type: "newAnswer" })}
      ></textarea>
    </>
  );
}

export default TextQuestion;
