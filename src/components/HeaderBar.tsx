import { AppBar, Toolbar, Typography, Box } from "../shared/utils/muiImports";
import { Link } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HeaderBar = () => (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            {/* Left-side Title */}
             <Typography
              variant="h6"
              noWrap
              onClick={() => window.location.href = "/home-ui/"}
              sx={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: 1, // Push links to the right
                display: 'flex', // Ensure flex layout
                alignItems: 'center', // Vertically align text and icon
                "&:hover": {
                  textDecoration: "none"
                }
                  }}
                >
                 Hospital Management System
                <LocalHospitalIcon sx={{ marginLeft: 1, verticalAlign: 'middle' }} /> {/* Adjust marginLeft here */}
                </Typography>

            {/* Right-side Links */}
            <Box sx={{ display: "flex", gap: 7 }}>            
                <Typography
                    variant="body1"
                    onClick={() => window.location.href = "/settings-ui/"}
                    sx={{
                        textDecoration: "none", 
                        color: "inherit",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                        cursor: "pointer",
                    }}
                >
                <BuildIcon sx={{ marginRight: 1, verticalAlign: 'middle'}} /> {/* Icon for Settings */}
                    Settings
                </Typography>
            </Box>
        </Toolbar>
    </AppBar>
);

export default HeaderBar;
