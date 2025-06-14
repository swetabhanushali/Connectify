import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMode = location?.state?.authMode === "signup" ? 1 : 0;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(initialMode);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        setName("");
        setUsername("");
        setPassword("");
        setError("");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Authentication Failed");
    }
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
            onClick={() => navigate("/:url")}
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
            Join as guest
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          height: "auto",
          padding: "3rem 3rem",
          borderRadius: "1rem",
          background: "#2d2d44",
          color: "#fff",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.4)",
          display: "flex",
          margin: "auto",
          marginTop: "7rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#FFD93D", mb: 2 }}>
            <LockOutlinedIcon sx={{ color: "#2d2d44" }} />
          </Avatar>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
              sx={{
                backgroundColor: formState === 0 ? "#FFD93D" : "transparent",
                color: formState === 0 ? "#2d2d44" : "#FFD93D",
                fontWeight: "bold",
                borderColor: "#FFD93D",
              }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => setFormState(1)}
              sx={{
                backgroundColor: formState === 1 ? "#FFD93D" : "transparent",
                color: formState === 1 ? "#2d2d44" : "#FFD93D",
                fontWeight: "bold",
                borderColor: "#FFD93D",
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box component="form" noValidate sx={{ width: "100%" }}>
            {formState === 1 && (
              <TextField
                fullWidth
                margin="normal"
                required
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#fff", borderRadius: 6 },
                }}
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: 6 },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: 6 },
              }}
            />

            {error && (
              <Typography color="error" sx={{ mt: 1, fontSize: "0.9rem" }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleAuth}
              sx={{
                mt: 3,
                backgroundColor: "#FFD93D",
                color: "#2d2d44",
                fontWeight: "bold",
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "#FFC107",
                },
              }}
            >
              {formState === 0 ? "Login" : "Register"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
}
