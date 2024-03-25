import form_image from "../../assets/document.png";
import { Button } from "@mui/material";

import "./Formheader.css";

function Formheader({ postData }) {
  return (
    <div className="form_header">
      <div className="form_header_left">
        <img src={form_image} style={{ height: "45px", width: "40px" }} />
        <input
          type="text"
          placeholder="Anket Adı"
          className="form_name"
        ></input>
        <span style={{ fontSize: "12px", fontWeight: "600" }}>
          Tüm değişiklikler kaydedildi
        </span>
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
  );
}

export default Formheader;
