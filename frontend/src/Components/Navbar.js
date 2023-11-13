import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer after navigation
  };

  const drawer = (
      <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
      >
        <List>
          {['Track', 'Ship', 'Contact Us'].map((text) => (
              <ListItem
                  button
                  key={text}
                  onClick={() => handleNavigation(text === 'Track' ? '/track' : text === 'Ship' ? '/ship' : '/contact')}
              >
                <ListItemText primary={text} />
              </ListItem>
          ))}
        </List>
      </Box>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="info">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Delivery Co.
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button color="inherit" onClick={() => navigate('/track')}>Track</Button>
              <Button color="inherit" onClick={() => navigate('/ship')}>Ship</Button>
              <Button color="inherit" onClick={() => navigate('/contact')}>Contact Us</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </Box>
  );
}

export default Navbar;