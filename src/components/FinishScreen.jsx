import { Link } from "react-router-dom";
import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function FinishScreen() {
  const { dispatch } = useQuiz();

  const emoji = "🎉";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Anket Bitmiştir
      </p>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Anasayfa
      </Link>
    </>
  );
}

export default FinishScreen;
