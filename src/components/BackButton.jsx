import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function BackButton() {
  const { dispatch, index, choices } = useQuiz();

  if (index > 0)
    return (
      <button
        className="btn btn-back"
        onClick={() => {
          dispatch({ type: "backQuestion" });
        }}
      >
        Önceki
      </button>
    );
}

export default BackButton;
