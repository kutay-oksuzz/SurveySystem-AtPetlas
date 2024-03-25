import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  multipleChoises: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
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
      };

    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };

    case "multipleNewAnswer":
      return {
        ...state,
        multipleChoises: action.payload,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
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

  const { questions, status, index, answer } = state;

  const numQuestions = questions.length;

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await axios("http://localhost:5107/api/Question");
        const newData = res.data.map((item) => {
          if (item.options) {
            item.options = JSON.parse(item.options.replace(/'/g, '"')); // Tek tırnak işaretlerini çift tırnak işaretleriyle değiştir ve diziye dönüştür
          }
          return item;
        });


        dispatch({ type: "dataReceived", payload: newData });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        numQuestions,
        dispatch,
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
