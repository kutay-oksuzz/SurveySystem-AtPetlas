import SurveyList from "./SurveyList";
import { useEffect, useState } from "react";
import axios from "axios";

const ContentMain = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(function () {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5107/api/Question");
        setSurveys(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <style>{`
      /* main content holder */
      .main-content-holder {
          display: grid;
          row-gap: 40px;
        
        }
        .content-grid-create{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 16px;
        }
        .content-grid-one {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 16px;
        }
        .content-grid-two {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 16px;
        }
        
        .subgrid-two {
          display: grid;
          row-gap: 20px;
          height: 100%;
        }
        
        @media screen and (max-width: 1200px) {
          .content-grid-one,
          .content-grid-two,
          .content-grid-create {
            column-gap: 12px;
          }
          .main-content-holder,
          .subgrid-two {
            row-gap: 12px;
          }
        }
        
        @media screen and (max-width: 992px) {
          .content-grid-create{
            grid-template-columns: repeat(2, 1fr);
          }
          .content-grid-one {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 12px;
          }
          .content-grid-two {
            grid-template-columns: repeat(2, 1fr);
          }
          .content-grid-two .grid-two-item:nth-child(3) {
            grid-column-start: 1;
            grid-column-end: 3;
          }
          .content-grid-two .grid-two-item:nth-child(3) .subgrid-two {
            grid-template-columns: repeat(2, 1fr);
            height: 220px;
            column-gap: 12px;
          }
          .content-grid-two {
            row-gap: 12px;
          }
        }
        
        @media screen and (max-width: 768px) {
          .content-grid-one {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 0;
          }
          .content-grid-two {
            grid-template-columns: repeat(1, 1fr);
            column-gap: 0;
          }
          .content-grid-two .grid-two-item:nth-child(1) {
            grid-column-start: 1;
            grid-column-end: 3;
          }
          .content-grid-two .grid-two-item:nth-child(3) .subgrid-two {
            grid-template-columns: repeat(1, 1fr);
            height: auto;
          }
          .content-grid-two .grid-two-item:nth-child(3) .subgrid-two .subgrid-two-item {
            height: 220px;
          }
        }
        
      `}</style>
      <div className="main-content-holder">
        <div className="content-grid-one">
          {surveys.length > 0 &&
            surveys.map((survey, index) => {
              return <SurveyList key={index} survey={survey} />;
            })}
        </div>
      </div>
    </>
  );
};

export default ContentMain;
