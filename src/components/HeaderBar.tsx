import { AppBar, Toolbar, Typography, Box } from "../shared/utils/muiImports";
import { Link } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// Retrieve URLs from environment variables
const APP_MAIN_UI_URL = process.env.REACT_APP_MAIN_UI_URL || "https://gray-dune-0f3035600.4.azurestaticapps.net/";
const SETTINGS_URL = process.env.REACT_APP_SETTINGS_UI_URL || "https://happy-bay-05cf1b400.4.azurestaticapps.net/";

const HeaderBar = () => (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            {/* Left-side Title */}
             <Typography
              variant="h6"
              noWrap
              component={Link}
              to={APP_MAIN_UI_URL}
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
                    component={Link}
                    to={SETTINGS_URL}
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
