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
            /* background-color: rgba(0, 0, 0, 0.5); */
            position: fixed;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          
          .modalContainer {
            max-width: 600px;
            width: 100%;
            position: fixed;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            background-color: #ffff
            box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
            border-radius: 8px;
          }
          
          .modalRight {
            width: 100%;
            border-radius: 100px;
          }
          
          .closeBtn {
            position: fixed;
            top: 8px;
            right: 8px;
            color: #ff125;
            cursor: pointer;
          }
          .wrapper{
            width: 100%;
            background: rgba(255, 255, 255, 0.4);
            border: 2px solid rgba(255, 255, 255 .5);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            color:rgba(244, 12, 4, 0.889);
            border-radius: 10px;
            padding: 70px 40px;
            
          }
          .wrapper h1{
              font-size: 2rem;
              text-align: center;
          }
          .wrapper .input-box{
              position: relative;
              width: 100%;
              height: 100%;
              margin: 30px;
              
          }
          .input-box input{
              widht: 100%,
              height: 100%;
              background: #707b7c36;
              outline: none;
              border: 5px solid rgba(255, 255, 255, .2);
              border-radius: 40px;
              font-size: 16px;
              color: #fff;
              padding: 15px 225px 20px 20px;
              
          }
          .input-box input::placeholder{
              color: #fff;
               
          }
          .input-box .icon{
              position:absolute;
              right: 100px;
              top: 50%;
              transform:translateY(-50%);
              font-size: 16px;
              
          }
          .wrapper .adminButton{
              width: 100%;
              height: 45px;
              background: #fff;
              border: none;
              outline: none;
              border-radius: 40px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              cursor: pointer;
              font-size: 16px;
              color: #fff;
              font-weight: 700;
              transform: translateX(-5%);
          }
          #two {
              background-image: linear-gradient(
                to right,
                rgba(244, 12, 4, 0.889) 50%,
                rgba(21, 25, 99, 0.778) 50%
              );
              background-size: 200%;
              transition: 0.4s ease-out;
              
          }
            
          #two:hover {
              background-position: right;
              position: center;
         }
         @media screen and (max-width: 500px) {
              .modalContainer {
              flex-direction: column;
              top: 0;
              left: 0;
              transform: none;
              width: 100%;
              height: 100vh;
          }
          .heading {
              margin: 1rem;
          }
            
        }`}</style>
        <div onClick={onClose} className="overlay">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="modalContainer"
          >
            <div className="modalRight">
              <div className="wrapper">
                <p className="closeBtn" onClick={onClose}>
                  X
                </p>
                <h1>YÖNETİCİ GİRİŞİ</h1>
                <div className="input-box">
                  <input type="text" placeholder="Email" required />
                  <FaUser className="icon" />
                </div>
                <div className="input-box">
                  <input type="password" placeholder="Şifre" required />
                  <FaLock className="icon" />
                </div>
                <Link to="/admin">
                  <button className="adminButton" type="submit" id="two">
                    GİRİŞ
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainPage;
