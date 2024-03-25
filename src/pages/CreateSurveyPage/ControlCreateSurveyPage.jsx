import Formheader from "./Formheader";
import Centeredtabs from "./Tabs";
import Question_form from "./Question_form";
import { useState } from "react";
import axios from "axios";

function ControlCreateSurveyPage() {
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "checkbox",
      options: [],
      open: true,
      required: false,
    },
  ]);

  function postDataHandler() {
    const processedDataList = questions.map((data) => {
      // options alanındaki değeri gerçek bir diziye dönüştür

      // Yeni formata uygun veriyi oluştur
      return {
        questionText: data.questionText,
        questionType: data.questionType,
        options:
          "[" + data.options.map((option) => `'${option}'`).join(", ") + "]",
        required: data.required,
      };
    });

    const fetchData = async () => {
      try {
        const jsonData = JSON.stringify(processedDataList);
        await axios.post("http://localhost:5107/api/Question", jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }

  return (
    <>
      <Formheader postData={postDataHandler} />
      <Centeredtabs />
      <Question_form questions={questions} setQuestions={setQuestions} />
    </>
  );
}

export default ControlCreateSurveyPage;
