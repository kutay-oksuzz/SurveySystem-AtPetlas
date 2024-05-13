import Formheader from "./Formheader";
import Centeredtabs from "./Tabs";
import Question_form from "./Question_form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SurveyEdit from "./SurveyEdit";

function ControlCreateSurveyPage() {
  const location = useLocation();
  const [surveyId, setSurveyId] = useState("");
  const isCreateRoute = location.pathname === "/admin/form";

  useEffect(() => {
    // Sayfa yüklendiğinde Survey ID'sini alın
    const pathParts = location.pathname.split("/");
    const id = pathParts[pathParts.length - 1]; // Son elemanı alarak ID'yi bulun
    setSurveyId(id);
  }, [location.pathname]);

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "checkbox",
      options: [],
      open: true,
      required: false,
    },
  ]);

  const [surveyDetails, setSurveyDetails] = useState({
    surveyName: "",
    surveyDescription: "",
  });

  function postDataHandler() {
    const combinedData = {
      surveyDetails: surveyDetails,
      questions: questions,
    };

    const fetchData = async () => {
      try {
        const jsonData = JSON.stringify(combinedData);

        if (isCreateRoute) {
          await axios.post(
            "http://localhost:5107/api/Question/postdata",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          await axios.put(
            `http://localhost:5107/api/Question/${surveyId}`,
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
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
      {isCreateRoute ? (
        <Question_form
          questions={questions}
          setQuestions={setQuestions}
          setSurveyDetails={setSurveyDetails}
        />
      ) : (
        <>
          <SurveyEdit
            questions={questions}
            setQuestions={setQuestions}
            surveyDetail={surveyDetails}
            setSurveyDetails={setSurveyDetails}
            surveyId={surveyId}
          />
        </>
      )}
    </>
  );
}

export default ControlCreateSurveyPage;
