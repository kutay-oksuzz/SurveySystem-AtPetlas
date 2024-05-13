import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/mainpage";
import SurveyStartPage from "./pages/LoginScreen/surveystartpage";
import SolveSurvey from "./pages/SolveSurveyPage/SolveSurvey";
import ControlAdminPage from "./pages/AdminPage/ControlAdminPage";
import ControlCreateSurveyPage from "./pages/CreateSurveyPage/ControlCreateSurveyPage";
import SurveyResults from "./pages/SurveyResults/SurveyResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/start" element={<SurveyStartPage />} />
      <Route path="/startSurvey" element={<SolveSurvey />} />
      <Route path="/admin" element={<ControlAdminPage />} />
      <Route path="/admin/form" element={<ControlCreateSurveyPage />} />
      <Route path="/admin/:id" element={<ControlCreateSurveyPage />} />
      <Route path="/results/:id" element={<SurveyResults />} />
    </Routes>
  );
}

export default App;
