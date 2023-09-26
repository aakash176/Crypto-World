import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types";

import LoginPage from "../components/LoginPage";
import Register from "../components/Register";
import CryptoContext, { CryptoState } from "../CryptoContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'grey',
  border:"1px solid black",
  borderRadius:"30px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
    
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
  
};
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  const [open, setOpen] = useState(false);
  const {user, setUser} = CryptoState()
  const [value, setValue] = useState(0);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setValue(0)
    if(user){
      setOpen(false); 
      setUser(null)
    }
    else{
      setOpen(true)
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        style={{
          color: "black",
          background: "gold",
          padding: "8px",
          marginLeft: "10px",
          fontWeight: "bold",
        }}
        onClick={handleOpen}
      >
        {user?'Logout': 'Login'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab style={{color:'white'}} label="Login" {...a11yProps(0)} />
                <Tab style={{color:'white'}} label="Sign up" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Box>
          {
            value == 0? <LoginPage handleClose={handleClose} />:<Register handleClose={handleClose}/>
          }
        </Box>
      </Modal>
    </div>
  );
}