import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const pages = [
  "Transformation",
  "Gym",
  "Coach",
  "Service",
  "Class",
  "Exercise",
  "Blog",
];

const LogoImage = styled("img")(() => ({
  maxWidth: 190,
  cursor: "pointer",
}));

const PageButton = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: 18,
  fontFamily: "'Outfit Variable', sans-serif",
  "&:hover": {
    color: "#2ed7de",
    background: "none",
  },
  "&:active": {
    color: "#221551",
    backgroundColor: "white",
  },
}));

const TrialButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#6e38d5",
  borderRadius: 50,
  fontSize: 17,
  fontWeight: 700,
  fontFamily: "'Outfit Variable', sans-serif",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const Header = ({ logoURL }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        backgroundColor: "#221551",
        py: 1,
        px: 4,
        boxSizing: "border-box",
        boxShadow: "none",
        width: '100%',
      }}
      position="sticky"
    >
      <Container maxWidth='xl'>
        <Toolbar>
          <LogoImage
            src={logoURL}
            onClick={() => navigate("/")}
          />
          <Box sx={{ display: "flex", margin: "auto" }}>
            {pages.map((page, idx) => (
              <PageButton
                key={idx}
                sx={{
                  my: 1,
                  display: "block",
                  px: 2.1,
                  py: 1.5,
                  color: window.location.pathname.startsWith(
                    `/${page.toLowerCase()}`
                  )
                    ? "#88dbdf !important"
                    : "white",
                }}
                disableRipple
                onClick={() => navigate(`/${page.toLowerCase()}`)}
              >
                {page}
              </PageButton>
            ))}
          </Box>
          <TrialButton onClick={() => navigate('/free-trial')} sx={{ px: 3, py: 1.3 }}>TRY US FOR FREE</TrialButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
