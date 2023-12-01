import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { CssBaseline, useMediaQuery, useTheme } from "@mui/material";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {["Track", "Ship", "Contact Us", "Review", "Flexible Delivery" ].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() =>
              handleNavigation(
                text === "Track"
                  ? "/track"
                  : text === "Ship"
                  ? "/multi"
                  : text === "Contact Us"
                  ? "/contact"
                  : text === "Review"
                  ? "/review"
                  : "/delivery"


              )
            }
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#0a040a" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {(!isMobileSize) && (
            <>
              <Button color="inherit" href="/track">
                Track
              </Button>
              <Button color="inherit" href="/multi">
                Ship
              </Button>
              <Button color="inherit" href="/contact">
                Contact Us
              </Button>
              <Button color="inherit" href="/review">
                Review
              </Button>
              <Button color="inherit" href="/delivery">
                Flexible Delivery
              </Button>
            </>
          )}

          <Button
              color="inherit"
              sx={{
                marginLeft: "auto",
              }}
              variant="h6"
              component={Link} // Use the Link component here
              to="/" // Specify the path to which it should navigate
          >
            Delivery Co.
          </Button>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
