import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Llene todos los campos");
      return;
    }

    const islogin = login({ username, password });
    if (islogin) {
      setPassword("");
      setUsername("");
      navigate('/home');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={onSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          boxShadow={3}
          borderRadius={2}
          bgcolor="background.paper"
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;