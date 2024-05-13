import { useNavigate } from "react-router-dom";
import EartchCanvas from "../../components/Earth";
import { useState } from "react";
//import "./surveystartpage.css";

function SurveyStartPage() {
  const navigate = useNavigate();

  const [surveyCode, setSurveyCode] = useState("");

  const loginHandler = () => {
    // Anket kodunu kontrol etmek için gerekli kod buraya eklenecek
    if (surveyCode.trim() !== "") {
      // Ankete geçerli bir kod girilmişse, navigate fonksiyonu ile ilgili ankete yönlendirilir
      //navigate(`/startSurvey/${surveyCode}`);
      localStorage.setItem("userCode", surveyCode);
      navigate("/startSurvey");
    } else {
      // Eğer anket kodu boşsa, kullanıcıya bir hata mesajı gösterilebilir veya başka bir işlem yapılabilir
      console.error("Anket kodu boş olamaz");
    }
  };

  return (
    <>
      <style>
        {`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Montserrat", sans-serif;
          }
          
          body {
            background-color: #c9d6ff;
            background: linear-gradient(to right, #4e5261af, #644242);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
          }
          
          .containers {
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 840px;
            max-width: 100%;
            min-height: 480px;
            /* top: 25%; */
            left: 7%;
          }
          
          .containers button {
            background-color: rgba(21, 25, 99, 0.778);
            color: #fff;
            font-size: 12px;
            padding: 15px 55px;
            border: 1.5px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 10px;
            cursor: pointer;
          }
          
          .containers form {
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 28px;
            padding: 0 40px;
            height: 100%;
          }
          
          .containers form h1 {
            font-size: 36px;
            color: #1e2f91;
            margin-bottom: 12px;
          }
          
          .input-containers {
            width: 340px;
            position: relative;
          }
          
          .label {
            position: absolute;
            left: 10px;
            top: 18px;
            transition: all 0.2s;
            padding: 0 2px;
            z-index: 1;
            color: #b3b3bb;
          }
          
          .text-input {
            padding: 0.8rem;
            width: 100%;
            height: 100%;
            border: 3px solid #d2d4da;
            background: #fff;
            font-optical-sizing: 5px;
            font-size: 18px;
            outline: none;
            transition: all 0.3s;
            color: red;
          }
          
          .label::before {
            content: "";
            height: 5px;
            position: absolute;
            left: 0;
            top: 10px;
            width: 100%;
            z-index: -1;
          }
          
          .text-input:focus {
            border: 3px solid #e83516f8;
          }
          
          .text-input:focus + .label,
          .filled {
            top: -20px;
            color: #e83516f8;
            font-weight: bold;
            font-size: 14px;
          }
          .text-input:focus + label,
          .text-input:valid + label {
            top: -20px;
            color: whitesmoke;
            font-size: 14px;
          }
          
          .text-input::placeholder {
            font-size: 16px;
            opacity: 0;
            transition: all 0.3s;
          }
          
          .text-input:focus::placeholder {
            opacity: 1;
            animation-delay: 0.2s;
          }
          
          .form-containers {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
          }
          
          .sign-in {
            left: 0;
            width: 50%;
          
            z-index: 2;
          }
          
          .toggle-containers {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            border-radius: 150px 0 0 100px;
            z-index: 1000;
          }
          
          .toggle {
            background-color: #512da8;
            height: 100%;
            background: linear-gradient(to right, #324289, #dc471d);
            color: #fff;
            position: relative;
          
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }
          
          .toggle-panel {
            position: absolute;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 30px;
            text-align: center;
            top: 0;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }
          `}
      </style>
      <div className="containers" id="containers">
        <div className="form-containers sign-in">
          <form>
            <h1>GİRİŞ EKRANI</h1>
            <div className="input-containers">
              <input
                type="text"
                className="text-input"
                id="username"
                autoComplete="off"
                placeholder="Anket kodunuzu yazın"
                required
                onChange={(e) => setSurveyCode(e.target.value)}
              ></input>
              <label htmlFor="usercode" className="label">
                ANKET KODUNUZU GİRİNİZ
              </label>
            </div>
            <div className="input-containers">
              <input
                type="text"
                className="text-input"
                id="username"
                autoComplete="off"
                placeholder="Emailinizi Giriniz"
                required
              ></input>
              <label htmlFor="usercode" className="label">
                EMAİLİNİZİ GİRİNİZ
              </label>
            </div>
            <button onClick={loginHandler}>ANKET SİSTEMİNE GİRİŞ</button>
          </form>
        </div>
        <div className="toggle-containers">
          <div className="toggle">
            <div className="toggle-panel toggle-left">{<EartchCanvas />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SurveyStartPage;
