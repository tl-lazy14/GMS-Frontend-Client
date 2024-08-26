import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useScrollToTop } from "../utils/handleScroll";
import IntroPageSection from "../components/IntroPageSection";
import { formatOperatingHours, formatPhone } from "../utils/formatString";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { InfoQuillSection } from "../components/InfoSection";
import { useEffect, useState } from "react";
import axios from "axios";

const GymItem = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: 20,
  boxSizing: "border-box",
  backgroundColor: "white",
}));

const NameText = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: 40,
  lineHeight: 1.3,
  wordSpacing: 5,
  marginBottom: 20,
}));

const Text = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
  lineHeight: 1.5,
}));

const LearnMoreButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e34d5",
  borderRadius: 4,
  fontSize: 17,
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  color: "white",
  "& .MuiSvgIcon-root": {
    fontSize: 25,
  },
  "&:hover": {
    backgroundColor: "#221551",
  },
}));

const GymPage = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const [infoIntro, setInfoIntro] = useState({});
  const [infoItems, setInfoItems] = useState([]);
  const [gymItems, setGymItems] = useState([]);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Gym",
          },
        }
      );
      setInfoIntro(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGeneralInfo = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-list-general-info",
        {
          params: {
            page: "Gyms Page",
          },
        }
      );
      setInfoItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListGyms = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/gym/get-list-active-gym"
      );
      const gyms = response.data.map(gym => {
        return {
          ...gym,
          operatingTime: JSON.parse(gym.operatingTime),
          listImage: JSON.parse(gym.listImage),
          amenity: JSON.parse(gym.amenity),
        };
      });
      setGymItems(gyms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getGeneralInfo();
    getListGyms();
  }, []);

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />

      <InfoQuillSection infoItems={infoItems} />

      <Box sx={{ px: 15, py: 8, backgroundColor: "#88dbdf" }}>
        <Typography
          sx={{
            fontFamily: "'Outfit Variable', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            fontSize: 50,
            color: "#221551",
            marginBottom: 5,
          }}
        >
          ALL OUR GYMS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {gymItems.map((item, idx) => {
            const groupedHours = formatOperatingHours(item.operatingTime);
            const hoursLines = groupedHours.split("\n");
            return (
              <GymItem sx={{ p: 5 }} key={idx}>
                <Box sx={{ width: "80vh" }}>
                  <NameText>{item.name}</NameText>
                  <Text sx={{ marginBottom: 1.5 }}>{item.description}</Text>
                  <Text sx={{ marginBottom: 0.5 }}>
                    Address: {item.address}
                  </Text>
                  <Text sx={{ marginBottom: 1.5 }}>
                    Contact: {formatPhone(item.phone)}
                  </Text>
                  <Text sx={{ marginBottom: 0.3 }}>Operating hours:</Text>
                  <Box>
                    {hoursLines.map((group, index) => (
                      <Text key={index}>{group}</Text>
                    ))}
                  </Box>
                  <LearnMoreButton
                    onClick={() => navigate(`/gym-detail/${item.id}`)}
                    sx={{ my: 3, px: 3 }}
                    endIcon={<ArrowRightAltIcon />}
                  >
                    Learn more
                  </LearnMoreButton>
                </Box>
                <img
                  style={{
                    width: "75vh",
                    height: "50vh",
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                  src={item.thumbnail}
                  alt="gym featured img"
                  loading="lazy"
                />
              </GymItem>
            );
          })}
        </Box>
      </Box>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default GymPage;
