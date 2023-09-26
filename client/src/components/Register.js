import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Register = ({ handleClose }) => {
 
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const body = { email, username, password };
        console.log(body);
        const res = await axios.post(
          "http://localhost:5000/api/register",
          body
        );
        if(res.status == 200){
          handleClose()
          navigate('/')
          alert("Sign up Sucessful, Welcome")

        }
      } catch (err) {
        alert(err)
      }
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          id="deterministic-outlined-input"
          style={{ marginTop: "8px" }}
          type="email"
          fullWidth
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          style={{ marginTop: "8px" }}
          type="text"
          fullWidth
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ marginTop: "8px" }}
          type="password"
          fullWidth
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          style={{ marginTop: "8px" }}
          type="password"
          fullWidth
          variant="outlined"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Button
        onClick={handleSubmit}
        type="submit"
        variant="contained"
        style={{ marginTop: "10px", background: "gold" }}
      >
        Register
      </Button>
    </div>
  );
};

export default Register