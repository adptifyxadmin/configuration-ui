import React from "react";
import { Toolbar, Drawer } from "../shared/utils/muiImports";
import "react-calendar/dist/Calendar.css";

const SidePanel: React.FC = () => (
  <Drawer
    variant="permanent"
    anchor="right"
    sx={{
      width: { xs: "100%", sm: "25%", md: 300 },
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: { xs: "100%", sm: "25%", md: 300 },
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        padding: 2,
      },
    }}
  >
    <Toolbar />
   
  </Drawer>
);

export default SidePanel;
