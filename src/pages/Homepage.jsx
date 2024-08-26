import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import ImageSlider from "../components/ImageSlider";
import { styled } from "@mui/material/styles";
import BG1 from "../assets/bg1.png";
import BG2 from "../assets/bg2.jpg";
import BG3 from "../assets/bg3.jpg";
import BG4 from "../assets/bg4.png";
import { useNavigate } from "react-router-dom";
import { InfoQuillSection } from "../components/InfoSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { ImageBackdrop } from "../components/ImageBackdrop";
import { formatNumberWithCommas } from "../utils/formatString";
import { useScrollToTop } from "../utils/handleScroll";
import axios from "axios";
import { useEffect, useState } from "react";

const utilitiesSectionImages = {
  blog: "https://firebasestorage.googleapis.com/v0/b/datn-fa8ff.appspot.com/o/images%2Fpexels-mastercowley-1153369.jpg?alt=media&token=b72ea86b-fcad-4d56-a743-a2622057fcb5",
  workout:
    "https://firebasestorage.googleapis.com/v0/b/datn-fa8ff.appspot.com/o/images%2Fpexels-jonathanborba-3076516.jpg?alt=media&token=4aaa8bcb-4f83-470a-a63e-99dd5ded3a6d",
};

const UtilitiesSection = styled(Box)(() => ({
  width: "100%",
  backgroundImage: `url(${BG1})`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#6244bb",
  display: "flex",
  justifyContent: "center",
  gap: "25vh",
  alignItems: "center",
}));

const UtilitiesItem = styled(Box)(() => ({
  width: "65vh",
  cursor: "pointer",
  "&:hover .utilities-img": {
    transform: "scale(1.1)",
  },
  "&:hover .utilities-text": {
    color: "#00c7b1",
  },
}));

const UtilitiesImage = styled("img")(() => ({
  width: "100%",
  height: "35vh",
  objectFit: "cover",
  transition: "0.3s",
  overflow: "hidden",
  loading: "lazy",
}));

const UtilitiesText = styled(Typography)(() => ({
  color: "white",
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 21,
  fontWeight: 600,
  lineHeight: 1.3,
  transition: "0.3s",
  marginTop: 8,
}));

const TitleSection = styled(Typography)(() => ({
  color: "white",
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 40,
  textAlign: "center",
  fontWeight: 600,
  marginBottom: 30,
}));

const LearnMoreButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e38d5",
  marginTop: 40,
  py: 1.2,
  fontSize: 18,
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 400,
  width: 180,
  alignSelf: "center",
  borderRadius: 20,
  transition: "0.4s",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const TransformationSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG2})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const TransItem = styled("Box")(() => ({
  marginLeft: "2vh !important",
  width: "55vh !important",
}));

const TransImage = styled("img")(() => ({
  width: "100%",
  height: "55vh",
  borderRadius: 5,
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  objectFit: "cover",
}));

const NextArrow = styled(ChevronRightIcon)(() => ({
  fontSize: 70,
  fontWeight: 900,
  color: "white",
  opacity: 0.5,
  transition: "0.3s",
  "&:hover": {
    color: "white",
    opacity: 1,
  },
  position: "absolute",
  right: -60,
}));

const PrevArrow = styled(ChevronLeftIcon)(() => ({
  fontSize: 70,
  fontWeight: 900,
  color: "white",
  opacity: 0.5,
  transition: "0.3s",
  zIndex: 1,
  "&:hover": {
    color: "white",
    opacity: 1,
  },
  position: "absolute",
  left: -60,
}));

const GymSection = styled(Box)(() => ({
  width: "100%",
}));

const GymItem = styled("Box")(() => ({
  position: "relative",
}));

const GymImage = styled("img")(() => ({
  width: "100%",
  height: "85vh",
  objectFit: "cover",
}));

const GymName = styled(Typography)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "#88dbdf",
  color: "#221551",
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 20,
  borderRadius: "0 0 50px 0",
  fontWeight: 500,
}));

const CoachSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG3})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const CoachItem = styled("Box")(() => ({
  marginLeft: "2vh !important",
  width: "40vh !important",
}));

const CoachImage = styled("img")(() => ({
  width: "100%",
  height: "55vh",
  borderRadius: 5,
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  objectFit: "cover",
}));

const ServiceSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG4})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const ServiceItem = styled(Box)(() => ({
  position: "relative",
  backgroundColor: "#fefefe",
  color: "#555",
  borderRadius: 20,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  transition: "0.3s",
  zIndex: 2,
  "&:hover .service-item-background-img": {
    opacity: 1,
    zIndex: -1,
  },
  "&:hover": {
    color: "white",
    "& .package-item-divider": {
      borderTopColor: "#88dbdf",
    },
    "& .backdrop-package": {
      display: "block",
      borderRadius: 20,
    },
    "& .amount-package": {
      color: "white",
    },
  },
}));

const ServiceItemBackgroundImg = styled("img")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  objectFit: "cover",
  height: "100%",
  opacity: 0,
  overflow: "hidden",
  transition: "opacity 0.3s",
  borderRadius: 20,
}));

const Homepage = () => {
  const navigate = useNavigate();

  useScrollToTop();

  const settingsTrans = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const settingsCoaches = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const settingsGyms = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: (
      <NextArrow
        sx={{
          color: "#221551",
          opacity: 0.6,
          fontSize: 80,
          right: -80,
          "&:hover": {
            color: "#221551",
            opacity: 0.9,
          },
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        sx={{
          color: "#221551",
          opacity: 0.6,
          fontSize: 80,
          left: -80,
          "&:hover": {
            color: "#221551",
            opacity: 0.9,
          },
        }}
      />
    ),
  };

  const [imageSlider, setImageSlider] = useState([]);
  const [introduceItems, setIntroduceItems] = useState([]);
  const [transItems, setTransItems] = useState([]);
  const [gymDes, setGymDes] = useState("");
  const [gymItems, setGymItems] = useState([]);
  const [coachItems, setCoachItems] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);

  const getImageSlider = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/brand/get-image-slider"
      );
      const imageSliderResponse = JSON.parse(response.data.imageSlider);
      setImageSlider(imageSliderResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const getListGeneralInfo = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-list-general-info",
        {
          params: {
            page: "Home Page",
          },
        }
      );
      setIntroduceItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTransItems = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/customer/get-workout-result-homepage"
      );
      setTransItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGymDes = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Gym",
          },
        }
      );
      setGymDes(response.data.description);
    } catch (err) {
      console.log(err);
    }
  };

  const getListGyms = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/gym/get-list-active-gym"
      );
      setGymItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCoachItems = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/coach/get-list-coach-homepage"
      );
      setCoachItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListMembershipPackage = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/service/get-active-membership-package"
      );
      setServiceItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImageSlider();
    getListGeneralInfo();
    getTransItems();
    getGymDes();
    getListGyms();
    getCoachItems();
    getListMembershipPackage();
  }, []);

  return (
    <Box>
      {imageSlider.length > 0 && <ImageSlider images={imageSlider} />}

      <UtilitiesSection sx={{ py: 5 }}>
        <UtilitiesItem onClick={() => navigate("/blog")}>
          <Box
            sx={{
              width: "100%",
              height: "35vh",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <UtilitiesImage
              className="utilities-img"
              src={utilitiesSectionImages.blog}
              alt="blog_optional"
            />
          </Box>
          <UtilitiesText className="utilities-text">
            Explore helpful blogs about workouts, nutrition, and promotions
          </UtilitiesText>
        </UtilitiesItem>
        <UtilitiesItem onClick={() => navigate("/exercise")}>
          <Box
            sx={{
              width: "100%",
              height: "35vh",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <UtilitiesImage
              className="utilities-img"
              src={utilitiesSectionImages.workout}
              alt="workout_optional"
            />
          </Box>
          <UtilitiesText className="utilities-text">
            Explore our workout video library for expert-guided exercises
          </UtilitiesText>
        </UtilitiesItem>
      </UtilitiesSection>

      <InfoQuillSection infoItems={introduceItems} />

      <TransformationSection sx={{ px: 15, py: 7, boxSizing: "border-box" }}>
        <ImageBackdrop />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TitleSection>Before & After Transformations</TitleSection>
          <Slider {...settingsTrans}>
            {transItems.map((item, idx) => (
              <TransItem key={idx}>
                <Box
                  sx={{
                    width: "100%",
                    height: "55vh",
                    overflow: "hidden",
                    borderRadius: 5,
                  }}
                  onClick={() => navigate(`/transformation-detail/${item.id}`)}
                >
                  <TransImage src={item.imageUrl} alt="trans img" loading="lazy" />
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 23,
                    py: 1,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  className="trans-name"
                  onClick={() => navigate(`/transformation-detail/${item.id}`)}
                >
                  {item.memberService?.member?.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#88dbdf",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 20,
                  }}
                >
                  {item.numWeeks} Weeks
                </Typography>
              </TransItem>
            ))}
          </Slider>
          <LearnMoreButton
            variant="contained"
            onClick={() => navigate("/transformation")}
          >
            See more
          </LearnMoreButton>
        </Box>
      </TransformationSection>

      <GymSection sx={{ px: 22, py: 7, boxSizing: "border-box" }}>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TitleSection sx={{ color: "#221551", marginBottom: 1 }}>
            Gyms
          </TitleSection>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 19,
              fontFamily: "'Outfit Variable', sans-serif",
              maxWidth: "120vh",
              margin: "auto",
              marginBottom: 6,
            }}
          >
            {gymDes}
          </Typography>
          <Slider {...settingsGyms}>
            {gymItems.map((item, idx) => (
              <GymItem key={idx}>
                <GymName sx={{ px: 4, py: 1.2 }}>{item.name}</GymName>
                <GymImage src={item.thumbnail} alt="club img" loading="lazy" />
              </GymItem>
            ))}
          </Slider>
          <LearnMoreButton variant="contained" onClick={() => navigate("/gym")}>
            See details
          </LearnMoreButton>
        </Box>
      </GymSection>

      <CoachSection sx={{ px: 15, py: 7, boxSizing: "border-box" }}>
        <ImageBackdrop />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TitleSection>Highly Qualified Coaches</TitleSection>
          <Slider {...settingsCoaches}>
            {coachItems.map((item, idx) => (
              <CoachItem key={idx}>
                <Box
                  sx={{
                    width: "100%",
                    height: "55vh",
                    overflow: "hidden",
                    borderRadius: 5,
                  }}
                  onClick={() => navigate(`/coach-detail/${item.id}`)}
                >
                  <CoachImage src={item.imageUrl} alt="trans img" loading="lazy" />
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 23,
                    py: 1,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  className="coach-name"
                  onClick={() => navigate(`/coach-detail/${item.id}`)}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#88dbdf",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 20,
                  }}
                >
                  {item.level}
                </Typography>
              </CoachItem>
            ))}
          </Slider>
          <LearnMoreButton
            variant="contained"
            onClick={() => navigate("/coach")}
          >
            See all
          </LearnMoreButton>
        </Box>
      </CoachSection>

      <ServiceSection
        sx={{
          px: 15,
          py: 7,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TitleSection sx={{ color: "#221551", marginBottom: 7 }}>
          Our Membership Packages
        </TitleSection>
        <Box>
          <Grid container spacing={10} justifyContent="center">
            {serviceItems.map((item, idx) => (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex" }}
              >
                <ServiceItem sx={{ p: 4, flexGrow: 1 }}>
                  <ServiceItemBackgroundImg
                    className="service-item-background-img"
                    src={item.thumbnail}
                    alt=""
                  />
                  <ImageBackdrop
                    className="backdrop-package"
                    sx={{ display: "none", zIndex: -1 }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "'Outfit Variable', sans-serif",
                      fontSize: 21,
                      fontWeight: 600,
                    }}
                  >
                    {item.name.toUpperCase()}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "#221551",
                      fontSize: 65,
                      fontFamily: "'Outfit Variable', sans-serif",
                      fontWeight: 700,
                    }}
                    className="amount-package"
                  >
                    <Typography
                      sx={{
                        fontSize: 40,
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontWeight: 700,
                        marginRight: 0.8,
                      }}
                    >
                      $
                    </Typography>{" "}
                    {formatNumberWithCommas(item.priceMonth.toString())}
                    <Typography
                      sx={{
                        fontSize: 30,
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      /month
                    </Typography>
                  </Typography>
                  <Divider
                    className="package-item-divider"
                    sx={{ borderTop: "2px solid #555" }}
                  />
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontFamily: "'Outfit Variable', sans-serif",
                      marginTop: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.description}
                  </Typography>
                </ServiceItem>
              </Grid>
            ))}
          </Grid>
        </Box>
        <LearnMoreButton
          variant="contained"
          onClick={() => navigate("/service")}
        >
          Join now
        </LearnMoreButton>
      </ServiceSection>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default Homepage;
