import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function Progress() {
  const { index, numQuestions, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
    </header>
  );
}

export default Progress;
