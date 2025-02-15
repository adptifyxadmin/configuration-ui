import { Box, Drawer, Toolbar } from "@mui/material";
import HeaderBar from "../components/HeaderBar";
import Content from "../components/Content";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/Toast";
import Sidebar from "../components/Sidebar";
import { menuItems } from "../components/types/Sidebar.types";

const Layout: React.FC = () => {
  return (
      <Box sx={{ display: "flex" }}>
          <Toast></Toast>
          <HeaderBar />
          <Drawer
              variant="permanent"
              sx={{
                  width: { xs: "100%", sm: "25%", md: 240 },
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                      width: { xs: "100%", sm: "25%", md: 240 },
                      boxSizing: "border-box",
                  },
              }}
          >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                  <Sidebar menuItems={menuItems}></Sidebar>
              </Box>
          </Drawer>
          <Content />
      </Box>
  );
};
export default Layout;
