import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";

function CenteredTabs() {
  return (
    <Paper>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{
          fontSize: 12,
          color: "#5f6368",
          textTransform: "capitalize",
          fontWeight: 600,
          fontFamily: "Google Sans, Roboto, Arial, sans-serif",
        }}
      >
        <Tab label="Sorular" style={{ fontSize: "24px" }} />
      </Tabs>
    </Paper>
  );
}

export default CenteredTabs;
