import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";

function TextQuestion() {
  const { dispatch, questions, index } = useQuiz();

  return (
    <>
      <h5>Cevabınızı buraya yazın...</h5>
      <textarea
        required
        onChange={(e) => {
          dispatch({
            type: "textNewAnswer",
            textResponse: e.target.value,
            questionId: questions[index].questionId,
          });
        }}
      ></textarea>
    </>
  );
}

export default TextQuestion;
