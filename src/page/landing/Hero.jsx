import * as React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/IPPEBA.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom>
          Welcome to IPPEBA
        </Typography>
        <Typography variant="h5" paragraph sx={{ mb: 4 }}>
          Empowering communities through sustainable development and economic
          growth
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" size="large" href="/#projects">
            Our Projects
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            href="/#contact"
          >
            Contact Us
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;

// function Hero() {
//   return (
//     <section id="home" className="hero">
//       <div className="container">
//         <div className="hero-content">
//           <h1>IPPEBA CONNECT</h1>
//           <p>Sauyunan Sauntuyan, Tinu Loba Jadi Hiji</p>
//           <div className="hero-buttons">
//             <button className="btn-primary">Learn More</button>
//             <button className="btn-secondary">Donate</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;
