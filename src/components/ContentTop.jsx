import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const ContentTop = () => {
  return (
    <>
      <style>
        {`
        /* main content top */
        .main-content-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .sidebar-toggler {
          display: flex;
          align-items: center;
          margin-right: 12px;
        }
        .sidebar-toggler img {
          width: 20px;
        }
        .content-top-title {
          color: var(--clr-white);
          font-size: 20px;
          font-weight: 600;
        }
        .content-top-btn {
          margin-left: 18px;
        }
        .content-top-btn img {
          width: 24px;
        }
        .content-top-btn img:hover {
          filter: brightness(0) invert(1);
        }
        .content-top-left {
          display: flex;
          align-items: center;
        }
        
        `}
      </style>
      <div className="main-content-top">
        <div className="content-top-left">
          <h3 className="content-top-title">Ana Ekran</h3>
        </div>
      </div>
      <NavLink
        to="/admin/form"
        sx={{
          display: "flex",
          marginRight: "auto",
        }}
      >
        <Button
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginBottom: "10px",
            marginLeft: "auto",
            backgroundColor: "#29221d",
            color: "#fe6c00",
          }}
        >
          <AddIcon sx={{ mr: "10px" }} />
          Anket Oluştur
        </Button>
      </NavLink>
    </>
  );
};

export default ContentTop;
