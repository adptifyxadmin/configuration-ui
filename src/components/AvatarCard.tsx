import { Avatar, Box, Paper, Typography } from "../shared/utils/muiImports";
import { AvatarCardProps } from "./types/AvatarCard.types";

const AvatarCard = ({ user }: AvatarCardProps) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
      borderRadius: 2,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f5f5f5",
      marginBottom: 2,
    }}
  >
    <Avatar
      alt={user.name || "User Photo"}
      src={user.photoUrl || "/user.png"}
      sx={{
        width: { xs: 80, sm: 100, md: 120 },
        height: { xs: 80, sm: 100, md: 120 },
        marginBottom: 1,
        border: "2px solid #1976d2",
      }}
    />
    <Box sx={{ mt: 1 }}>
      <Typography variant="body1" color="textSecondary">
        Name : {user.name || "David Ben"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Age : {user.dateOfBirth || "50 Years"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Blood Group : {user.bloodGroup || "AB+"}
      </Typography>
    </Box>
  </Paper>
);

export default AvatarCard;
