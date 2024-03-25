import { iconsImgs } from "../pages/AdminPage/utils/images";
import { useContext } from "react";
import { SidebarContext } from "../pages/AdminPage/context/sidebarContext";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
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
          <button
            type="button"
            className="sidebar-toggler"
            onClick={() => toggleSidebar()}
          >
            <img src={iconsImgs.menu} alt="" />
          </button>
          <h3 className="content-top-title">Home</h3>
        </div>
        <div className="content-top-btns">
          <button type="button" className="search-btn content-top-btn">
            <img src={iconsImgs.search} alt="" />
          </button>
          <button className="notification-btn content-top-btn">
            <img src={iconsImgs.bell} />
            <span className="notification-btn-dot"></span>
          </button>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
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
      </Box>
    </>
  );
};

export default ContentTop;
