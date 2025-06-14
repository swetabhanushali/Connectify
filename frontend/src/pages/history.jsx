import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {}
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1c1c2e",
        color: "#fff",
        paddingBottom: "40px",
      }}
    >
      <Box className="navBar">
        <Typography
          variant="h4"
          sx={{ fontWeight: "800", fontFamily: "Poppins" }}
          className="logo-text"
        >
          CONNECTIFY
        </Typography>

        <Button
          startIcon={<HomeIcon />}
          onClick={() => routeTo("/home")}
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
            fontFamily: "Poppins",
            textTransform: "uppercase",
            color: "#E0F7FA",
            backgroundColor: "transparent",
            borderBottom: "2px solid transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#FFD93D",
              borderBottom: "2px solid #FFD93D",
              backgroundColor: "transparent",
            },
          }}
        >
          Home
        </Button>
      </Box>

      <Box
        sx={{
          padding: "30px 60px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            fontWeight: "bold",
            fontFamily: "Poppins",
            textAlign: "center",
            color: "#FFC107",
            textDecoration: "underline",
            fontSize: "2rem",
          }}
        >
          Meeting History
        </Typography>

        {meetings.length > 0 ? (
          meetings.map((e, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                backgroundColor: "#2c2c3e",
                borderRadius: "16px",
                padding: 2,
                color: "#fff",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
                  Meeting Code: <strong>{e.meetingCode}</strong>
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No history available yet.</Typography>
        )}
      </Box>
    </Box>
  );
}
