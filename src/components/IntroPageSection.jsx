import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IntroPageBackdrop } from "./ImageBackdrop";

const Title = styled(Typography)(() => ({
  color: "white",
  fontSize: 70,
  fontWeight: 700,
  fontFamily: "'Outfit Variable', sans-serif",
  lineHeight: 1.3,
}));

const Description = styled(Typography)(() => ({
  color: "white",
  fontSize: 17,
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 300,
}));

const IntroPageSection = ({ title, des, backgroundImg }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        boxSizing: "border-box",
        px: 20,
        py: 5,
        height: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IntroPageBackdrop />
      <Box
        sx={{
          position: "relative",
          maxWidth: "80vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Title>{title}</Title>
        <Description>{des}</Description>
      </Box>
    </Box>
  );
};

export default IntroPageSection;
