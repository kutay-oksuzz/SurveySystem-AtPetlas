import axios from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  surveyDetails: {},
  index: 0,
  answer: null,
  multipleChoises: [],
};

function reducer(state, action) {
  let newChoices;

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questionsByCode,
        surveyDetails: action.payload.surveyDetails,
        ResSurveyId: action.payload.surveyDetails.surveyId,
        status: "ready",
        allResponses: {},
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };

    case "backQuestion":
      return {
        ...state,
        index: state.index - 1,
        choices: [],
      };

    case "newAnswer":
      if (Array.isArray(action.payload)) {
        // Eğer payload zaten bir dizi ise, doğrudan at
        newChoices = action.choiceIds;
      } else {
        // Değilse, tek elemanı diziye çevir
        newChoices = [action.choiceIds];
      }
      return {
        ...state,
        answer: action.payload,
        choiceIds: action.choiceIds,
        questionId: action.questionId,
        choices: newChoices,
        allResponses: {
          ...state.allResponses,
          [action.questionId]: newChoices,
        },
      };

    case "multipleNewAnswer":
      if (!state.choices || !state.choices.includes(action.choiceIds)) {
        // choices null ise veya seçenek zaten ekli değilse, seçeneği ekle
        newChoices = [...(state.choices || []), action.choiceIds];
      } else {
        // Seçenek zaten ekli ise, seçeneği kaldır
        newChoices = state.choices.filter((id) => id !== action.choiceIds);
      }
      return {
        ...state,
        answer: action.payload, // answer değişmemeli, action.payload olarak kalacak
        choices: newChoices, // yeni seçenekler choices değişkeninde saklanacak
        choiceIds: action.choiceIds,
        questionId: action.questionId,
        allResponses: {
          ...state.allResponses,
          [action.questionId]: newChoices,
        },
      };

    case "textNewAnswer":
      return {
        ...state,
        answer: action.payload,
        allResponses: {
          ...state.allResponses,
          [action.questionId]: action.textResponse,
        },
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null, choices: null };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Action unkonwn");
  }
}

// eslint-disable-next-line react/prop-types
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [userCode, setUserCode] = useState(localStorage.getItem("userCode"));

  const {
    questions,
    status,
    index,
    choices,
    answer,
    surveyDetails,
    ResSurveyId,
    choiceIds,
    questionId,
    allResponses,
  } = state;

  const numQuestions = questions.length;

  useEffect(
    function () {
      //const userCode = localStorage.getItem("userCode");
      async function getQuestions() {
        try {
          const res = await axios(
            `http://localhost:5107/getSurveyByCode/${userCode}`
          );

          const data = await res.data;

          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed" });
        }
      }
      getQuestions();
    },
    [userCode]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        questionId,
        choiceIds,
        ResSurveyId,
        status,
        index,
        answer,
        choices,
        numQuestions,
        surveyDetails,
        dispatch,
        allResponses,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
