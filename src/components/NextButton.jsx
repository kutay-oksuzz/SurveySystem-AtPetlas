import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function NextButton() {
  const { dispatch, answer, index, numQuestions, questions } = useQuiz();

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Bitir
      </button>
    );
  }

  if (!questions[index].required) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Sonraki
      </button>
    );
  }

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Sonraki
      </button>
    );
  }
}

export default NextButton;
