import React from "react";
import { Toolbar, Drawer, Box, Typography, Divider } from "../shared/utils/muiImports";
import "react-calendar/dist/Calendar.css";

const SidePanel: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: { xs: "100%", sm: "30%", md: 320 },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { xs: "100%", sm: "30%", md: 320 },
          boxSizing: "border-box",
          bgcolor: "background.default",
          color: "text.primary",
          borderLeft: "1px solid #ddd",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          p: 2,
        },
      }}
    >
      <Toolbar />
      
      {/* Side Panel Content */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Side Panel
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Add your side widgets below */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          You can place Calendar, Notifications, Reminders or Task Lists here.
        </Typography>
        {/* Example: <Calendar /> */}
      </Box>
    </Drawer>
  );
};

export default SidePanel;
