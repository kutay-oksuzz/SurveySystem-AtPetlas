import { useQuiz } from "../pages/SolveSurveyPage/QuizContext";
//import MultipleChoises from "./MultipleChoises";
import OneChoise from "./OneChoise";
import MultipleChoise from "./MultipleChoise";
import TextQuestion from "./TextQuestion";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  function questionControlHandler(question) {
    if (question.questionType === "text") {
      return <TextQuestion question={question} />;
    } else if (question.questionType === "radio") {
      return <OneChoise question={question} />;
    } else {
      return <MultipleChoise question={question} />;
    }
  }

  return (
    <div>
      <h4>{question.questionText}</h4>
      {questionControlHandler(question)}
    </div>
  );
}

export default Question;
