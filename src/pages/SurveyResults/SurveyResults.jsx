import "./SurveyResults.css";
import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function SurveyResults() {
  const [results, setResults] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5107/api/Question/getResultsSurvey/${id}`
        );
        console.log(response.data);
        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      palette: {
        background: {
          paper: "#1e293b",
          default: "0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 25px",
            },
            body: {
              padding: "12px 25px",
              color: "#e2e8f0",
              fontSize: "16px",
            },
          },
        },
      },
    });

  const renderResult = (result) => {
    switch (result.questionType) {
      case "checkbox":
      case "radio":
        return renderChoicesResult(result);
      case "text":
        return renderTextResult(result);
      default:
        return null;
    }
  };

  const renderChoicesResult = (result) => {
    const totalResponses = result.choices.reduce(
      (total, choice) => total + choice.responseCounter,
      0
    );

    // Yüzdelik oranı hesapla ve her bir seçeneğe ekleyerek yeni bir dizi oluştur
    const choicesWithPercentage = result.choices.map((choice) => ({
      ...choice,
      percentage: Math.round((choice.responseCounter / totalResponses) * 100),
    }));

    const columns = [
      { name: "choiceText", label: "Soru Şıkları" },
      {
        name: "responseCounter",
        label: "Cevaplanma Sayısı",
        options: {
          customBodyRender: (value) => (
            <p
              className="capitalize px-3 py-1 inlice-block text-center rounded-full 
            bg-blue-500 w-2/3"
            >
              {value}
            </p>
          ),
        },
      },
      {
        name: "percentage",
        label: "% lik Oranı",
        options: {
          customBodyRender: (value) => (
            <p
              className={`capitalize px-3 py-1 inlice-block text-center rounded-full 
                bg-rose-500
              `}
            >
              % {value}
            </p>
          ),
        },
      },
    ];

    return (
      <MUIDataTable
        key={result.questionText}
        title={result.questionText}
        data={choicesWithPercentage}
        columns={columns}
        options={getOptions()}
      />
    );
  };

  const renderTextResult = (result) => {
    const columns = [
      {
        name: "choiceText",
        label: "Girilen Cevap",
        options: {
          customBodyRender: (value) => (
            <p className="capitalize px-3 py-3 inlice-block  rounded-full bg-green-600 w-2/3">
              {value}
            </p>
          ),
        },
      },
    ];

    return (
      <MUIDataTable
        key={result.questionText}
        title={result.questionText}
        data={result.choices}
        columns={columns}
        options={getOptions()}
      />
    );
  };

  const getOptions = () => ({
    selectableRows: false,
    elevation: 0,
    rowsPerpage: 5,
    rowsPerPageOptions: [5, 10],
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
  });

  return (
    <div className="bg-slate-700 py-10 min-h-screen grid place-items-center">
      <h2 className="text-3xl font-bold text-white mb-4">SONUÇ EKRANI</h2>
      <div className="w-10/12 max-w-4xl">
        <ThemeProvider theme={getMuiTheme()}>
          {results.map((result, index) => (
            <div key={index} className="mb-12">
              {renderResult(result)}
            </div>
          ))}
        </ThemeProvider>
      </div>
    </div>
  );
}

export default SurveyResults;
