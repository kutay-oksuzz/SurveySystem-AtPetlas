import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>HOŞGELDİNİZ</h2>
      <h3>Yemekhane Değerlendirme Anketi</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Başlayın
      </button>
    </div>
  );
}

export default StartScreen;
