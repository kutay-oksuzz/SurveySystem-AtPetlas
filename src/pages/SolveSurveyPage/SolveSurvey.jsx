import Error from "../../components/Error";
import FinishScreen from "../../components/FinishScreen";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Question from "../../components/Question";
import NextButton from "../../components/NextButton";

import Progress from "../../components/Progress";
import StartScreen from "../../components/StartScreen";

import { useQuiz } from "./QuizContext";
import BackButton from "../../components/BackButton";
import { useEffect } from "react";

export default function SolveSurvey() {
  const { status } = useQuiz();

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
    :root {
      --color-darkest: #343a40;
      --color-dark: #495057;
      --color-medium: #ced4da;
      --color-light: #f1f3f5;
    
      --color-theme: #1098ad;
      --color-accent: #ffa94d;
    }
    
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      font-size: 62.5%;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    
    body {
      min-height: 100vh;
      color: var(--color-light);
      background-color: var(--color-darkest);
      padding: 3.2rem;
      /*padding: 3.2rem;
      /*background: linear-gradient(to right, #393544, #4f5f6e);*/
      background: url("bg.png") no-repeat center center/cover;*/
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }z
    
    .containers {
      width: 700px;
      height: 700px;
      display: flex;
      padding: 150px 0;
      justify-content: center;
      box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(3px);
      position: fixed;
      bottom: 0;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3); /* Arka plan rengi */
      margin-bottom: 100px; /* Noktalı virgül eklenmeli */
    }
    
    .containers h5 {
      color: #fff;
      font-weight: 300;
      width: 500px;
      margin-top: 20px;
      
      font-size: 22px;
    }
    
    .containers textarea {
      background: linear-gradient(to right, #b7b2bc, #cfd9e2);
    
      border: none;
      border-bottom: 2px solid #fff;
      color: #fff;
      font-weight: 200;
      font-size: 15px;
      padding: 10px;
      outline: none;
      min-width: 500px;
      max-width: 500px;
      min-height: 120px;
      max-height: 120px;
    }
    
    textarea::-webkit-scrollbar {
      width: 1em;
    }
    
    textarea::-webkit-scrollbar-thumb {
      background-color: rgba(194, 194, 194, 0.713);
    }
    
    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 90px;
      position: initial;
    }
    
    .app h1 {
      font-size: 24px;
    }
    
    .main {
      width: 50rem;
    }
    
    .app-header {
      width: 90%;
      margin-bottom: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .error {
      text-align: center;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 2rem;
      background-color: #495057;
      border-radius: 100px;
    }
    
    img {
      width: 10rem;
    }
    
    h1 {
      font-family: "Codystar";
      font-size: 5.6rem;
    }
    
    h2 {
      font-size: 3.6rem;
      margin-bottom: 2rem;
    }
    
    h3 {
      font-size: 2.4rem;
      font-weight: 600;
      margin-bottom: 4rem;
    }
    
    h4 {
      font-size: 2.2rem;
      font-weight: 600;
      margin-bottom: 2.4rem;
    }
    
    .start {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
    }
    
    .progress {
      margin-bottom: 3rem;
      display: grid;
      justify-content: space-between;
      gap: 1.2rem;
      grid-template-columns: auto auto;
      font-size: 1.8rem;
      color: var(--color-medium);
    }
    
    progress {
      -webkit-appearance: none;
      width: 100%;
      height: 12px;
      grid-column: 1 / -1;
    }
    
    ::-webkit-progress-bar {
      background-color: var(--color-medium);
      border-radius: 100px;
    }
    ::-webkit-progress-value {
      background-color: var(--color-theme);
      border-radius: 100px;
    }
    
    .btn {
      display: block;
      font-family: inherit;
      color: inherit;
      font-size: 2rem;
      border: 2px solid var(--color-dark);
      background-color: var(--color-dark);
      padding: 1.2rem 2.4rem;
      cursor: pointer;
      border-radius: 100px;
      transition: 0.3s;
    }
    
    .btn:not([disabled]):hover {
      background-color: var(--color-darkest);
    }
    
    .btn-option:not([disabled]):hover {
      transform: translateX(1.2rem);
    }
    
    .btn[disabled]:hover {
      cursor: not-allowed;
    }
    
    .btn-ui {
      float: right;
    }
    
    .options {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-bottom: 3.2rem;
    }
    
    .btn-option {
      width: 100%;
      text-align: left;
    }
    
    .btn-option.correct {
      background-color: var(--color-theme);
      border: 2px solid var(--color-theme);
      color: var(--color-light);
    }
    
    .answer {
      transform: translateX(2rem);
      background-color: var(--color-theme);
      border: 2px solid var(--color-theme);
      color: var(--color-light);
    }
    
    .result {
      background-color: var(--color-theme);
      color: var(--color-light);
      border-radius: 100px;
      text-align: center;
      padding: 2rem 0;
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 1.6rem;
    }
    
    .result span {
      font-size: 2.2rem;
      margin-right: 4px;
    }
    
    .highscore {
      font-size: 1.8rem;
      text-align: center;
      margin-bottom: 4.8rem;
    }
    
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 4rem;
      gap: 1.6rem;
    
      color: var(--color-medium);
      font-size: 1.4rem;
    }
    
    .btn-back {
      float: left;
      font-size: 1.8rem;
      color: var(--color-medium);
      border: 2px solid var(--color-dark);
      padding: 1.35rem 2.8rem;
      border-radius: 100px;
    }
    
    /* CREDIT: https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
    .loader {
      width: 50px;
      height: 24px;
      background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0%
          50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
      background-size: calc(100% / 3) 12px;
      background-repeat: no-repeat;
      animation: loader 1s infinite linear;
    }
    
    @keyframes loader {
      20% {
        background-position: 0% 0%, 50% 50%, 100% 50%;
      }
      40% {
        background-position: 0% 100%, 50% 0%, 100% 50%;
      }
      60% {
        background-position: 0% 50%, 50% 100%, 100% 0%;
      }
      80% {
        background-position: 0% 50%, 50% 50%, 100% 100%;
      }
    }
    
    /* ********** */
    /* First counter example */
    .counter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      font-size: 2rem;
      font-weight: bold;
      margin: 6rem;
    }
    
    .counter * {
      font-size: inherit;
      padding: 0.8rem;
    }`;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
              <BackButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
