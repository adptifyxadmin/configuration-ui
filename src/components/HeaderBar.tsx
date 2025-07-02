import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "../shared/utils/muiImports";
import { Link } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HeaderBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Title with hover effect */}
        <Box
          component={Link}
          to="/home-ui/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateX(5px) scale(1.05)",
            },
          }}
        >
          <Typography variant="h6" noWrap fontWeight={600}>
            Hospital Management System
          </Typography>
          <LocalHospitalIcon sx={{ ml: 1 }} />
        </Box>

        {/* Settings with same effect */}
        <Box
          component={Link}
          to="/settings-ui/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateX(5px) scale(1.05)",
            },
          }}
        >
          <BuildIcon sx={{ mr: 0.5 }} />
          <Typography variant="body1" fontWeight={500}>
            Settings
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
