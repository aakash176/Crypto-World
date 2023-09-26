import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import { CryptoState } from '../CryptoContext';
import Login from '../pages/Login';
import {CgProfile} from 'react-icons/cg'
import Profile from './Profile';
const Header = () => {

  const {currency, setCurrency, user, setUser} = CryptoState()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }
  const handleLoginClick = () => {
    navigate('/login')
  }
  const darkTheme = createTheme({
    palette:{
      primary:{ main:"#fff"},
      type:"dark"
    }
  })
  console.log(currency);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={handleLogoClick}
              className="typography__header"
            >
              Crypto World
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            <Login/>
            {
              user?<Profile/>:<></>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header