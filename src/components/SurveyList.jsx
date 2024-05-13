import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Survey1 = ({ key, survey }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/${survey.surveyId}`);
  };

  const handleResultClick = () => {
    navigate(`/results/${survey.surveyId}`);
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
      <div className="grid-one-item grid-common grid-c1" key={key}>
        <div className="grid-items">
          <div className="grid-item">
            <div className="grid-c-title">
              <h3 className="grid-c-title-text">{survey.surveyText}</h3>

              <IconButton aria-label="warning">
                <DescriptionTwoToneIcon
                  style={{
                    fontSize: "25px",
                    display: "grid",
                    position: "absolute",
                    color: "var(--clr-pumpkin)",
                  }}
                  onClick={handleResultClick}
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
              <IconButton aria-label="delete">
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
                      50
                      <span>%</span>
                    </h3>
                  </div>
                </div>
              </div>
              <ul className="data-list">
                <li className="data-item text-silver-v1">
                  <span className="data-item-text">
                    {survey.surveyDescription}
                  </span>
                </li>
                <li className="data-item text-silver-v1"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Survey1;
