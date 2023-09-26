import { Box, Button, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import CryptoContext, { CryptoState } from '../CryptoContext'
import {CgProfile} from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
const LoginPage = ({handleClose}) => {
  const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, setUser} = CryptoState()
    console.log({email:email, password:password})
    const handleSubmit = async() => {
      if(!email || !password){
        alert("Enter email as well as password")
      }
      else{
        try {
          const body = {email, password}
          const res = await axios.post('http://localhost:5000/api/login', body)
          console.log(res);
          if(res.status == 201){
            alert(`welcome ${res.data.username}`)
            navigate('/')
            handleClose()
            setUser(res.data.email)
            const wishlist_crypto = await axios.post("http://localhost:5000/api/login", {email});
            console.log(wishlist_crypto);
          }
          else{
            alert(res.data.message)
          }
        } catch (error) {
          alert(error)
        }
      }
    }
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
          type="password"
          fullWidth
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button onClick={handleSubmit}
      type='submimt'
        variant="contained"
        style={{ marginTop: "10px", background: "gold" }}
      >
        Login
      </Button>
      
    </div>
  );
}

export default LoginPage