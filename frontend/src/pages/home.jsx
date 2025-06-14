import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box className="home-root">
      <Box className="navBar">
        <Typography
          variant="h4"
          sx={{ fontWeight: "800", fontFamily: "Poppins" }}
          className="logo-text"
        >
          Connectify
        </Typography>
        <Box display="flex" alignItems="center" gap={2} className="nav-buttons">
          <Button
            variant="text"
            startIcon={<RestoreIcon />}
            onClick={() => navigate("/history")}
            sx={{
              fontSize: "1.1rem",
              fontWeight: "600",
              fontFamily: "Poppins",
              textTransform: "uppercase",
              color: "#E0F7FA",
              padding: "0.4rem 0.6rem",
              borderBottom: "2px solid transparent",
              transition: "all 0.3s ease",

              "&:hover": {
                color: "#FFD93D",
                borderBottom: "2px solid #FFD93D",
              },
            }}
          >
            History
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            sx={{
              fontSize: "1.1rem",
              fontWeight: "600",
              fontFamily: "Poppins",
              textTransform: "uppercase",
              color: "#E0F7FA",
              padding: "0.4rem 0.6rem",
              borderBottom: "2px solid transparent",
              transition: "all 0.3s ease",

              "&:hover": {
                color: "#FFD93D",
                borderBottom: "2px solid #FFD93D",
                backgroundColor: "transparent",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box className="meetContainer">
        <Paper elevation={6} className="leftPanel paper-section">
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Seamless Video Meetings
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mb={3}>
            Join meetings instantly with a secure code.
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Meeting Code"
              variant="outlined"
              onChange={(e) => setMeetingCode(e.target.value)}
              sx={{ minWidth: "220px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinVideoCall}
              sx={{ px: 3 }}
            >
              Join Meeting
            </Button>
          </Box>
        </Paper>

        <Box
          className="rightPanel"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginRight="2rem"
        >
          <img
            src="/logo3.png"
            alt="Meeting Illustration"
            className="right-image"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default withAuth(HomeComponent);
