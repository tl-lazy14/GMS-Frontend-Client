import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import PublicIcon from "@mui/icons-material/Public";
import "@fontsource/poppins/700.css";
import { formatHotline } from "../utils/formatString";

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
  maxWidth: 180,
  cursor: "pointer",
  alignSelf: "flex-start",
}));

const TitleTypo = styled(Typography)(() => ({
  fontSize: 18,
  color: "white",
  fontWeight: 700,
  fontFamily: "'Outfit Variable', sans-serif",
}));

const SiteMapButton = styled(Typography)(() => ({
  textTransform: "none",
  fontSize: 16,
  color: "#c5c4c9",
  cursor: "pointer",
  fontFamily: "'Outfit Variable', sans-serif",
  "&:hover": {
    color: "white",
    background: "none",
  },
  textAlign: "left",
}));

const HotlineText = styled(Typography)(() => ({
  fontSize: 35,
  color: "#88dbdf",
  fontFamily: "'Poppins', sans-serif",
}));

const MediaButton = styled(IconButton)(() => ({
  color: "white",
  opacity: 0.7,
  "&:hover": {
    opacity: 1,
  },
}));

const ItemInfo = styled(Typography)(() => ({
  display: "flex",
  gap: 5,
  fontSize: 16,
  fontFamily: "'Outfit Variable', sans-serif",
}));

const Footer = ({ logoURL, brandInfo }) => {
  const navigate = useNavigate();

  const openMediaLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box sx={{ backgroundColor: "#221551", py: 1.5, width: "100%" }}>
      <Box
        display="flex"
        sx={{ px: 15, py: 5, flexGrow: 1 }}
        gap={12}
        justifyContent="space-between"
      >
        <LogoImage
          src={logoURL}
          onClick={() => navigate("/")}
        />
        <Box display="flex" flexDirection="column" gap={1.5}>
          <TitleTypo>SITE MAP</TitleTypo>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1.8}
          >
            {pages.map((page, idx) => (
              <SiteMapButton
                key={idx}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
              >
                {page}
              </SiteMapButton>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.2} flexShrink={0}>
          <TitleTypo>HOTLINE</TitleTypo>
          {brandInfo.hotline && (
            <HotlineText>{formatHotline(brandInfo?.hotline)}</HotlineText>
          )}
          <TitleTypo>SOCIAL MEDIA</TitleTypo>
          <Box display="flex">
            {brandInfo?.mediaLink?.facebook !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.facebook)}
                title="Facebook"
                disableRipple
              >
                <FaFacebook size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.youtube !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.youtube)}
                title="Youtube"
                disableRipple
              >
                <FaYoutube size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.instagram !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.instagram)}
                title="Instagram"
                disableRipple
              >
                <FaInstagram size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.twitter !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.twitter)}
                title="Twitter/X"
                disableRipple
              >
                <FaXTwitter size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.tiktok !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.tiktok)}
                title="Tiktok"
                disableRipple
              >
                <FaTiktok size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.pinterest !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.pinterest)}
                title="Pinterest"
                disableRipple
              >
                <FaPinterest size={30} />
              </MediaButton>
            )}
            {brandInfo?.mediaLink?.linkedin !== "" && (
              <MediaButton
                onClick={() => openMediaLink(brandInfo?.mediaLink?.linkedin)}
                title="Linkedin"
                disableRipple
              >
                <FaLinkedin size={30} />
              </MediaButton>
            )}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <TitleTypo>INFORMATION</TitleTypo>
          <Box
            display="flex"
            flexDirection="column"
            gap={1.5}
            sx={{ color: "#c5c4c9" }}
          >
            <ItemInfo>
              <EmailIcon /> Email: {brandInfo?.email}
            </ItemInfo>
            <ItemInfo>
              <HouseIcon /> Business Address: {brandInfo?.businessAddress}
            </ItemInfo>
            <ItemInfo>
              <PublicIcon /> Tax Code: {brandInfo?.taxCode}
            </ItemInfo>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          fontFamily: "'Outfit Variable', sans-serif",
          fontSize: 17,
        }}
      >{`© ${new Date().getFullYear()} ${
        brandInfo?.nameBrand
      }. All Rights Reserved.`}</Typography>
    </Box>
  );
};

export default Footer;
