// ButtonAppBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="warning">
        <Toolbar>
          <Button color="inherit" to="/track">Track</Button>
          <Button color="inherit" to="/ship">Ship</Button>
          <Button color="inherit" to="/quote">Quote</Button>
          <Button color="inherit" to="/contact">Contact Us</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
            Delivery Co.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
