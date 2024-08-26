import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { useScrollToTop } from "../utils/handleScroll";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { formatOperatingHours, formatPhone } from "../utils/formatString";
import ImageSlider from "../components/ImageSlider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import axios from "axios";

const TopContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
}));

const Backdrop = styled("span")(() => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "black",
  opacity: 0.9,
}));

const BackButton = styled(Button)(() => ({
  textTransform: "none",
  fontSize: 19,
  color: "white",
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  "&:hover": {
    background: "none",
    textDecoration: "underline",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 25,
  },
}));

const NameText = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "white",
  fontSize: 60,
  lineHeight: 1.3,
  wordSpacing: 5,
}));

const Text = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
  color: "white",
  fontWeight: 300,
  lineHeight: 1.5,
}));

const FreeTrialBtn = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e34d5",
  borderRadius: 0,
  fontSize: 20,
  fontWeight: 600,
  fontFamily: "'Outfit Variable', sans-serif",
  color: "white",
  "&:hover": {
    backgroundColor: "#221551",
  },
}));

const GymDetailPage = () => {
  useScrollToTop();
  const { id } = useParams();

  const navigate = useNavigate();
  const [gymInfo, setGymInfo] = useState({});

  const getGym = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/gym/get-gym/${id}`
      );
      setGymInfo({
        ...response.data,
        operatingTime: JSON.parse(response.data.operatingTime),
        listImage: JSON.parse(response.data.listImage),
        amenity: JSON.parse(response.data.amenity),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGym();
  }, []);

  return (
    <Box>
      <TopContainer
        sx={{ px: 20, py: 7, backgroundImage: `url(${gymInfo.thumbnail})` }}
      >
        <Backdrop />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <BackButton
            variant="text"
            onClick={() => navigate("/gym")}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Back to List
          </BackButton>

          <NameText>{gymInfo.name}</NameText>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "30%" }}>
              <Text>{gymInfo.description}</Text>
              <FreeTrialBtn
                onClick={() => navigate("/free-trial")}
                sx={{ px: 5.5, py: 1.3, my: 5 }}
              >
                FREE TRIAL
              </FreeTrialBtn>
            </Box>

            <Box sx={{ width: "27%" }}>
              <Text sx={{ marginBottom: 0.5 }}>Address: {gymInfo.address}</Text>
              {gymInfo.phone && (
                <Text sx={{ marginBottom: 2.5 }}>
                  Contact: {formatPhone(gymInfo.phone)}
                </Text>
              )}
              <Text sx={{ marginBottom: 0.5 }}>Operating hours:</Text>
              <Box>
                {gymInfo.operatingTime &&
                  formatOperatingHours(gymInfo.operatingTime)
                    .split("\n")
                    .map((group, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Text>{group.split(": ")[0]}:</Text>
                        <Text>{group.split(": ")[1]}</Text>
                      </Box>
                    ))}
              </Box>
            </Box>

            <Box sx={{ width: "20%" }}>
              <Text sx={{ marginBottom: 0.5 }}>Amenities:</Text>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.7 }}>
                {gymInfo.amenity?.map((item, idx) => (
                  <Text
                    key={idx}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FiberManualRecordIcon
                      sx={{ fontSize: 12, marginRight: 1 }}
                    />
                    {item}
                  </Text>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </TopContainer>

      {gymInfo.listImage?.length > 0 && (
        <ImageSlider images={gymInfo.listImage} />
      )}

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default GymDetailPage;
