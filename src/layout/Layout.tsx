import {
    Box,
    Drawer,
    Toolbar,
    useTheme,
    useMediaQuery,
    CssBaseline
  } from "@mui/material";
  import HeaderBar from "../components/HeaderBar";
  import Content from "../components/Content";
  import "react-toastify/dist/ReactToastify.css";
  import Toast from "../components/Toast";
  import Sidebar from "../components/Sidebar";
  import { menuItems } from "../components/types/Sidebar.types";
  
  const drawerWidth = 240;
  
  const Layout: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Box sx={{ display: "flex", backgroundColor: "#f9f9f9" }}>
        <CssBaseline />
        <Toast />
        <HeaderBar />
  
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              borderRight: "1px solid #e0e0e0",
              boxShadow: isMobile ? theme.shadows[5] : "none",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflowY: "auto", height: "100%" }}>
            <Sidebar menuItems={menuItems} />
          </Box>
        </Drawer>
  
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
            transition: "margin 0.3s ease",
          }}
        >
          <Content />
        </Box>
      </Box>
    );
  };
  
  export default Layout;
  