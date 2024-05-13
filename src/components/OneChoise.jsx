import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

// eslint-disable-next-line react/prop-types
function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  //const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}`}
            key={option}
            onClick={() =>
              dispatch({
                type: "newAnswer",
                payload: index,
                choiceIds: question.choiceIds[index],
                questionId: question.questionId,
              })
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
