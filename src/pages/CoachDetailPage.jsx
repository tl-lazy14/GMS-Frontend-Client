import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useScrollToTop } from "../utils/handleScroll";
import { useNavigate, useParams } from "react-router-dom";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import QuillContent from "../components/QuillContent";
import BG from "../assets/bg4.png";
import BG1 from "../assets/bg3.jpg";
import Schedule from "../components/Schedule";
import { ImageBackdrop } from "../components/ImageBackdrop";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const TitlePage = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 55,
  fontWeight: 600,
}));

const TitleSection = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 23,
  fontWeight: 600,
  marginTop: 25,
  marginBottom: 20,
}));

const CoachName = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 40,
  fontWeight: 600,
  padding: 0,
}));

const CoachImage = styled("img")(() => ({
  width: "65vh",
  borderRadius: 16,
  objectFit: "cover",
}));

const OtherCoachesImage = styled("img")(() => ({
  width: "45vh",
  height: "55vh",
  borderRadius: "16px 16px 0 0",
  objectFit: "cover",
}));

const OtherCoachesSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const BackButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e38d5",
  fontSize: 17,
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  alignSelf: "center",
  borderRadius: 20,
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const CoachDetailPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { id } = useParams();

  const [coachInfo, setCoachInfo] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [otherItems, setOtherItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoachInfo = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/coach/get-coach-info/${id}`
      );
      setCoachInfo(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getCoachSchedule = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/coach/get-coach-busy-schedule/${id}`
      );
      setSchedule(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOtherItems = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/coach/get-other-coaches/${id}`
      );
      setOtherItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoachInfo();
    getCoachSchedule();
    getOtherItems();
  }, [id]);

  return (
    <Box>
      <Box sx={{ px: 20, py: 8, backgroundColor: "#f7f8ff" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <TitlePage>COACH INFORMATION</TitlePage>
          <BackButton
            variant="contained"
            onClick={() => navigate("/coach")}
            startIcon={<KeyboardBackspaceIcon />}
            sx={{ px: 3 }}
          >
            Back to List
          </BackButton>
        </Box>

        {!loading && (
          <Box sx={{ display: "flex", width: "100%", gap: 5 }}>
            <Box>
              <CoachImage src={coachInfo.imageUrl} alt="trans img" />
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#221551",
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontSize: 23,
                  fontWeight: 500,
                  my: 1,
                }}
              >
                {coachInfo.level}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                fontFamily: "'Outfit Variable', sans-serif",
              }}
            >
              <CoachName>
                Coach: {coachInfo.name} / Age:{" "}
                {dayjs().diff(dayjs(coachInfo.dob), "year")}
              </CoachName>
              <QuillContent content={coachInfo.description} />
              <Box>
                <TitleSection>Work Experience:</TitleSection>
                <QuillContent content={coachInfo.experience} />
              </Box>
              <Box>
                <TitleSection>Expertise:</TitleSection>
                <QuillContent content={coachInfo.expertise} />
              </Box>
              <Box>
                <TitleSection>Certifications:</TitleSection>
                <QuillContent content={coachInfo.certification} />
              </Box>
              <Box>
                <TitleSection>Achievements:</TitleSection>
                <QuillContent content={coachInfo.achievements} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {!loading && (
        <Box
          sx={{
            position: "relative",
            backgroundImage: `url(${BG1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            px: 20,
            py: 5,
          }}
        >
          <ImageBackdrop />
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                fontFamily: "'Outfit Variable', sans-serif",
                fontSize: 35,
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              Coach's Weekly Schedule
            </Typography>
            <Schedule schedule={schedule} />
          </Box>
        </Box>
      )}

      <OtherCoachesSection sx={{ px: 20, py: 7, boxSizing: "border-box" }}>
        <Typography
          sx={{
            color: "#221551",
            fontFamily: "'Outfit Variable', sans-serif",
            fontSize: 43,
            textAlign: "center",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          See more coaches
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {otherItems.length > 0 && otherItems.map((item, idx) => (
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              key={idx}
              onClick={() => navigate(`/coach-detail/${item.id}`)}
            >
              <OtherCoachesImage
                src={item.imageUrl}
                alt="trans img"
                loading="lazy"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, py: 1 }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#221551",
                    fontWeight: 500,
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 23,
                    transition: "0.3s",
                  }}
                  className="trans-name"
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#221551",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 20,
                    paddingBottom: 1,
                  }}
                >
                  {item.level}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </OtherCoachesSection>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default CoachDetailPage;
