import { Link } from "react-router-dom";
import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";
import axios from "axios";

function FinishScreen() {
  const { dispatch, allResponses, ResSurveyId } = useQuiz();
  const surveyCode = localStorage.getItem("userCode");

  const emoji = "🎉";

  const finishSurveyHandler = async () => {
    try {
      // allResponses verisini JSON formatına dönüştür
      const data = {
        data: {
          ...allResponses,
        },
        ResSurveyId: ResSurveyId,
      };
      const jsonData = JSON.stringify(data);
      console.log(data);
      // Sunucuya JSON formatındaki veriyi post et
      await axios.post(
        "http://localhost:5107/api/Question/postResults",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Anket Bitmiştir
      </p>
      <Link
        //to="/"
        style={{ textDecoration: "none" }}
        className="btn btn-ui"
        onClick={() => {
          finishSurveyHandler();
          dispatch({ type: "restart" });
        }}
      >
        Anasayfa
      </Link>
    </>
  );
}

export default FinishScreen;
