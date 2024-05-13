import form_image from "../../assets/document.png";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function Formheader({ postData }) {
  return (
    <>
      <style>{`
     .form_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px 120px 0 15px;
      background-color: #fff;
    }
    
    .form_header_left {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    
    .form_name {
      border: none;
      outline: none;
      font-family: "Google Sans", Roboto, Arial, sans-serif;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      margin-left: 15px;
      color: #202124;
      width: 120px;
    }
    
    .form_header_icon {
      color: #747c91;
      font-size: 20px;
    }
    
    .form_name:focus {
      border-bottom: 1px solid black;
    }
    
    .form_header_right {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
        
      `}</style>
      <div className="form_header">
        <div className="form_header_left">
          <img src={form_image} style={{ height: "45px", width: "40px" }} />
          <input
            type="text"
            placeholder="Anket"
            className="form_name"
            disabled
          ></input>
        </div>
        <div className="form_header_right">
          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            style={{ marginLeft: "10px" }}
            onClick={postData}
          >
            Gönder
          </Button>
        </div>
      </div>
    </>
  );
}

export default Formheader;
