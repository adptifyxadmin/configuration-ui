import { Avatar, Box, Paper, Typography } from "../shared/utils/muiImports";
import { AvatarCardProps } from "./types/AvatarCard.types";

const AvatarCard = ({ user }: AvatarCardProps) => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        },
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      <Avatar
        alt={user?.name || "User Photo"}
        src={user?.photoUrl || "/user.png"}
        sx={{
          width: { xs: 90, sm: 110 },
          height: { xs: 90, sm: 110 },
          mb: 2,
          border: "3px solid #1976d2",
        }}
      />

      <Box textAlign="center">
        <Typography variant="h6" fontWeight="600" gutterBottom>
          {user?.name || "David Ben"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Age: {user?.dateOfBirth || "50 Years"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Blood Group: {user?.bloodGroup || "AB+"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AvatarCard;
