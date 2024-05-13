import { useState } from "react";
import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

// eslint-disable-next-line react/prop-types
function Options({ question }) {
  const [indexCounter, setIndexCouter] = useState([]);
  const { dispatch, answer } = useQuiz();

  const indexHandler = (index) => {
    if (indexCounter.includes(index)) {
      // Eğer sayı zaten dizide varsa, diziden çıkar
      setIndexCouter((prevArray) => prevArray.filter((item) => item !== index));
    } else {
      // Eğer sayı dizide yoksa, diziye ekle
      setIndexCouter((prevArray) => [...prevArray, index]);
    }
  };

  return (
    <div className="options">
      {question.options.map((option, index) => {
        //console.log(question);
        return (
          <button
            className={`btn btn-option ${
              indexCounter.includes(index) ? "answer" : ""
            }`}
            key={option}
            onClick={() => {
              indexHandler(index);
              dispatch({
                type: "multipleNewAnswer",
                payload: indexCounter,
                choiceIds: question.choiceIds[index],
                questionId: question.questionId,
              });
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
