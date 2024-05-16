import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import videoBg from "../../assets/petlas.mp4";
import { useState } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const textHandler = () => {
    setText(
      "Abdulkadir Özcan, 1955'te hurda lastik teminiyle ticaret hayatına başlayarak AKO Grup'u kurdu. Grup, kullanılmış lastik işleme faaliyetlerini genişleterek dünyanın önde gelen markalarının Türkiye temsilciliğini üstlendi. Petlas'ı 2005'te satın alarak yerli lastik üretimine giren AKO Grup, 2012'de Sumitomo Rubber Industries ile ortaklık kurarak uluslararası alanda güç kazandı. Jant, akü, ve lastik geri dönüşüm tesisleriyle Türkiye'nin önde gelen üreticisi olan AKO Grup, yerli sermayesiyle Türkiye'nin geleceğine yatırım yapmaya devam ediyor."
    );
  };

  const textHandler1 = () => {
    setText(
      "AKO Kule, Söğütözü Mah. 2178. Cadde No:6 06530 Çankaya Ankara +90 (312) 309 30 30"
    );
  };

  return (
    <>
      <header>
        <style>{`
       @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }
        
        header {
          z-index: 999;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 200px;
          transition: 0.5s ease;
        }
        
        header .brand {
          color: #fff;
          font-size: 1.5em;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
        }
        header .navigation {
          position: relative;
        }
        
        header .navigation .navigation-items a {
          position: relative;
          color: #fff;
          font-size: 1em;
          font-weight: 100;
          text-decoration: none;
          margin-left: 30px;
          transition: 0.3s ease;
          cursor: pointer;
        }
        
        header .navigation .navigation-items a:before {
          content: "";
          position: relative;
          background-color: #fff;
          width: 0%;
          height: 3px;
          bottom: 0;
          left: 0;
          transition: 0.3s ease;
        }
        
        header .navigation .navigation-items a:hover:before {
          width: 100%;
        }
        .navigation .loginButton{
          width: 100px;
          height: 30px;
          background: transparent;
          border: 2px solid #fff;
          outline: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          color: #fff;
          font-weight: 500;
          margin-left: 40px;
         
        }
        section {
          padding: 100px 200px;
        }
        
        .home {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          flex-direction: column;
          background: #2696e9;
        }
        
        .home .content {
          z-index: 888;
          color: #fff;
          width: 70%;
          margin-top: 50px;
        }
        
        .home .content h1 {
          font-size: 4em;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 5px;
          line-height: 75px;
          margin-bottom: 40px;
          position:relative;
        }
        
        .home .content h1 span {
          font-size: 1.2em;
          font-weight: 600;
        }
        
        .home .content p {
          margin-bottom: 50px;
        }
        .home .media-icons {
          z-index: 888;
          position: absolute;
          right: 30px;
          display: flex;
          flex-direction: column;
          transition: 0.5 ease;
        }
        
        .home .media-icons a {
          color: #fff;
          font-size: 1.6em;
          transition: 0.3s ease;
        }
        
        .home .media-icons a:not(:last-child) {
          margin-bottom: 20px;
        }
        
        .home .media-icons a:hover {
          transform: scale(1.3);
        }
        
        .home video {
          z-index: 000;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
          
        .button {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          cursor: pointer;
        
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
        
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          background-color: #2f6cd8;
          color: white;
          margin-bottom: 2rem;
        }
        
        #one {
          background-image: linear-gradient(
            to right,
            rgba(244, 12, 4, 0.889) 50%,
            rgba(21, 25, 99, 0.778) 50%
          );
          background-size: 200%;
          transition: 0.4s ease-out;
        }
        
        #one:hover {
          background-position: right;
        }
        
        @media (max-width: 1040px) {
          header {
            padding: 12px 20px;
          }
        
          section {
            padding: 100px 20px;
          }
        
          .home .media-icons {
            right: 15px;
          }
        
          header .navigation {
            display: none;
          }
        
          .menu-btn {
            background-color: url(menu.png) no-repeat;
            background-size: 30px;
            background-position: center;
            width: 40px;
            height: 40px;
            cursor: pointer;
            transition: 0.3s ease;
          }
         
        }`}</style>
        <img src="logo.png" />

        <div className="menu-btn"></div>
        <div className="navigation">
          <div className="navigation-items">
            <a onClick={textHandler}>Hakkımızda</a>

            <a onClick={textHandler1}>İletişim</a>
            <button
              className="loginButton"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              GİRİŞ
            </button>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
          </div>
        </div>
      </header>
      <section className="home">
        <video className="video-slide" src={videoBg} autoPlay loop muted />

        <div className="content">
          <h1>
            GÜVENİLİR<br></br>
            <span>ANKET SİSTEMİ</span>
          </h1>
          <p>{text}</p>

          <div className="buttons">
            <button
              className="button"
              id="one"
              onClick={() => navigate("/start")}
            >
              <span>ANKETE BAŞLA</span>
            </button>
          </div>
        </div>
        <div className="media-icons">
          <a>
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a>
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <header>
        <style>{`
           /* Modal */
           .overlay {
            background-color: rgba(0, 0, 0, 0.25);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
          
        .modalContainer {
          max-width: 600px;
          width: 100%;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          background-color: #ffff
          box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
          border-radius: 8px;
        }

          
        .form-box {
            position: relative;
            width: 400px;
            height: 450px;
            background: transparent;
            border: none;
            border-radius: 20px;
            backdrop-filter: blur(50px) brightness(90%);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .form-value h2 {
            font-size: 2em;
            color: #fff;
            text-align: center;
        }
        
        .inputbox {
            position: relative;
            margin: 30px 0;
            width: 310px;
            border-bottom: 2px solid #fff;
        }
        
        .inputbox label {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            color: #fff;
            font-size: 1em;
            pointer-events: none;
            transition: 0.5s;
        }
        
        /* animations: start */
        input:focus~label,
        input:valid~label {
            top: -5px;
        }
        
        /* animation:end */
        .inputbox input {
            width: 100%;
            height: 50px;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1em;
            padding: 0 35px 0 5px;
            color: #fff;
        }
        
        .inputbox ion-icon {
            position: absolute;
            right: 8px;
            color: #fff;
            font-size: 1.2em;
            top: 20px;
        }
        
        .forget {
            margin: -10px 0 17px;
            font-size: 0.9em;
            color: #fff;
            display: flex;
            justify-content: space-between;
        }
        
        .forget label input {
            margin-right: 3px;
        }
        
        .forget a {
            color: #fff;
            text-decoration: none;
        }
        
        .forget a:hover {
            text-decoration: underline;
        }
        
        .form-value button {
            width: 100%;
            height: 40px;
            border-radius: 40px;
            background-color: #fff;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
        }
        
        .register {
            font-size: 0.9em;
            color: #fff;
            text-align: center;
            margin: 25px 0 10px;
        }
        
        .register p a {
            text-decoration: none;
            color: #fff;
            font-weight: 600;
        }
        
        .register p a:hover {
            text-decoration: underline;
        }
        
        @media screen and (max-width: 480px) {
            .form-box {
                width: 100%;
                border-radius: 0px;
            }
        }
          
        `}</style>
        <div onClick={onClose} className="overlay">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="modalContainer"
          >
            <div className="form-box">
              <div className="form-value">
                <form>
                  <h2>Login</h2>
                  <div className="inputbox">
                    {" "}
                    <ion-icon name="mail-outline"></ion-icon>{" "}
                    <input type="email" required />
                    <label>Email</label>
                  </div>
                  <div className="inputbox">
                    {" "}
                    <ion-icon name="lock-closed-outline"></ion-icon>{" "}
                    <input type="password" required /> <label>Password</label>{" "}
                  </div>
                  <div className="forget">
                    {" "}
                    <label>
                      <input type="checkbox" />
                      Remember Me
                    </label>{" "}
                    <a href="#">Forgot Password</a>{" "}
                  </div>{" "}
                  <button>Log In</button>
                  <div className="register">
                    <p>
                      Don't have an account? <a href="#">Sign Up</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainPage;
