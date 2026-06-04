import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#af4c4c", // Your primary color
      dark: "#7d2e2e", // Your secondary color
      light: "#c34a4a", // Your accent color
    },
    secondary: {
      main: "#333", // Your dark color
    },
    background: {
      default: "#f9f9f9", // Your light color
    },
    text: {
      primary: "#444", // Your text color
      secondary: "#777", // Your text-light
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontWeight: 600,
          padding: "10px 20px",
          textTransform: "none",
        },
        contained: {
          backgroundColor: "#af4c4c",
          "&:hover": {
            backgroundColor: "#7d2e2e",
          },
        },
        outlined: {
          borderColor: "#af4c4c",
          color: "#af4c4c",
          "&:hover": {
            backgroundColor: "#af4c4c",
            color: "white",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 15px",
        },
      },
    },
  },
});

export default theme;
