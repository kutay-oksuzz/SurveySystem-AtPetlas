import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { survey1 } from "../pages/AdminPage/data/data";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Survey1 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [surveys, setSurveys] = useState(survey1);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedSurveyId, setDeletedSurveyId] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = (id) => {
    setDeletedSurveyId(id);
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    const updatedSurveys = surveys.filter(
      (survey) => survey.id !== deletedSurveyId
    );
    setSurveys(updatedSurveys);
    setDeleteConfirmation(false);
    console.log("Anket silindi");
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };

  return (
    <>
      <style>
        {`
        /* grid c1 */
.grid-c1-content {
  margin-top: -70px;
  margin-bottom: -128px;
}
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-bar .percent {
  position: relative;
}
.progress-bar svg {
  position: relative;
  width: 210px;
  height: 210px;
  transform: rotate(-90deg);
}
.progress-bar svg circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--clr-jet);
  stroke-width: 20;
  stroke-linecap: round;
}
.progress-bar svg circle:last-of-type {
  stroke-dasharray: 625px;
  stroke-dashoffset: calc(625px - (625px * var(--percent)) / 168);
  stroke: var(--clr-pumpkin);
}
.progress-bar .number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.progress-bar .number h3 {
  font-weight: 200;
  font-size: 20px;
  font-weight: 500;
}
.progress-bar .number h3 span {
  font-size: 14px;
}
/* grid c1 */
.grid-c1-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.grid-c1-content .progress-bar {
  margin-left: -46px;
}
.grid-c1-content .data-list {
  margin-left: -20px;
  margin-top: 10px
}
.grid-c1-content .data-item {
  margin-bottom: 20px;
}
.grid-c1-content .data-item-value {
  margin-top: 8px;
  display: block;
  font-weight: 600;
}
.edit-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: var(--clr-pumpkin);
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 400px; 
  height: 300px; 
  align-items: center;
  
}

.popup-content input {
  width: 100%;
  margin-bottom: 10px;
}

.popup-content h2 {
  margin-bottom: 10px;
}
#one{
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  left: 300px;
  top: 1px;
  
}
.delete-confirmation{
  background-color: palegreen;
  position: relative;
  height: 50px;
  width: 200px;
  top: 50%;
  left: 140%;

}`}
      </style>
      <div className="grid-one-item grid-common grid-c1">
        <div className="grid-items">
          {surveys.map((survey) => (
            <div className="grid-item" key={survey.id}>
              <div className="grid-c-title">
                <h3 className="grid-c-title-text">{survey.title}</h3>
                <IconButton aria-label="warning">
                  <WarningOutlinedIcon
                    style={{
                      fontSize: "25px",
                      display: "grid",
                      position: "absolute",
                      color: "var(--clr-pumpkin)",
                    }}
                  />
                </IconButton>
              </div>
              <div className="grid-c-end">
                <IconButton aria-label="edit" onClick={handleEditClick}>
                  <EditOutlinedIcon
                    style={{
                      fontSize: "25px",
                      display: "grid",
                      position: "absolute",
                      color: "var(--clr-silver)",
                      marginRight: "20px",
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(survey.id)}
                >
                  <DeleteOutlinedIcon
                    style={{
                      fontSize: "25px",
                      display: "grid",
                      position: "absolute",
                      color: "var(--clr-silver)",
                    }}
                  />
                </IconButton>
              </div>
              <div className="grid-c1-content">
                <div className="progress-bar">
                  <div className="percent">
                    <svg>
                      <circle cx="105" cy="105" r="50"></circle>
                    </svg>
                    <div className="number">
                      <h3>
                        {survey.percent}
                        <span>%</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <ul className="data-list">
                  <li className="data-item text-silver-v1">
                    <span className="data-item-text">
                      Gönderilen Kişi Sayısı
                    </span>
                    <span className="data-item-value">{survey.send}</span>
                  </li>
                  <li className="data-item text-silver-v1">
                    <span className="data-item-text">
                      Tamamlayan Kişi Sayısı
                    </span>
                    <span className="data-item-value">{survey.complete}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        {isEditing && (
          <div className="edit-popup">
            <div className="popup-content">
              <IconButton
                aria-label="close"
                onClick={handleCloseClick}
                style={{ position: "absolute", top: "2px", right: "10px" }}
              >
                <CloseIcon />
              </IconButton>
              <span type="text">Anket Adı</span>
              <input
                type="text"
                placeholder="... Anketi"
                style={{
                  color: "var(--clr-pumpkin)",
                  height: "30px",
                  width: "362px",
                  borderRadius: "5px",
                }}
              />
              <span type="text">Yayınlama Tarihi</span>
              <input
                type="date"
                placeholder="Yayınlama Tarihi"
                style={{ height: "30px", width: "362px", borderRadius: "5px" }}
              />
              <span type="text">Geçerlilik Tarihi</span>
              <input
                type="date"
                placeholder="Geçerlilik Tarihi"
                style={{ height: "30px", width: "362px", borderRadius: "5px" }}
              />
              <span type="text">Sonlanma Tarihi</span>
              <input
                type="date"
                placeholder="Sonlanma Tarihi"
                style={{ height: "30px", width: "362px", borderRadius: "5px" }}
              />
              <button id="one" className="ok">
                Kaydet
              </button>
            </div>
          </div>
        )}
        {deleteConfirmation && (
          <div className="delete-confirmation">
            <p>Anket silinsin mi?</p>
            <button onClick={handleConfirmDelete}>Evet</button>
            <button onClick={handleCancelDelete}>Hayır</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Survey1;
