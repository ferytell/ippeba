// import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "#333",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: "#333",
          }}
        >
          IPPEBA <span style={{ color: "#af4c4c" }}>.</span>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/#about">
            About
          </Button>
          <Button color="inherit" href="/#projects">
            Projects
          </Button>
          {/* <Button color="inherit" href="/usaha-ekonomi-mesjid">
            UEM
          </Button> */}
          <Button color="inherit" href="/login">
            Login
          </Button>
        </Box>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
