import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QuizProvider } from "./pages/SolveSurveyPage/QuizContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizProvider>
  </React.StrictMode>
);
