import {
  Box,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IntroPageSection from "../components/IntroPageSection";
import { InfoQuillSection } from "../components/InfoSection";
import { useScrollToTop } from "../utils/handleScroll";
import { ImageBackdrop } from "../components/ImageBackdrop";
import BG3 from "../assets/bg3.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import axios from "axios";

const ListCoachContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG3})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const SelectStyled = styled(Select)(() => ({
  "& .MuiSelect-select": {
    fontFamily: "'Outfit Variable', sans-serif",
    fontSize: 19,
    color: "rgba(0, 0, 0, 0.8)",
    backgroundColor: "white",
    paddingLeft: 24,
    width: "17vh",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #ced4da",
  },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
}));

const CoachItem = styled(Box)(() => ({}));

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

const CoachPage = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const [infoIntro, setInfoIntro] = useState({});
  const [infoItems, setInfoItems] = useState([]);
  const [coachItems, setCoachItems] = useState([]);
  const [coachLevel, setCoachLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Coach",
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
        "http://localhost:2002/gms/api/v1/content-website/get-list-general-info",
        {
          params: {
            page: "Coaches Page",
          },
        }
      );
      setInfoItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListCoach = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/coach/get-list-coach",
        {
          params: {
            level: coachLevel,
            status: "Active",
            gym: "all",
            keyword: "",
            page: page,
          },
        }
      );
      setCoachItems(response.data.listItem);
      setTotalPages(Math.floor(response.data.numItem / 9) + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getGeneralInfo();
  }, []);

  useEffect(() => {
    getListCoach();
  }, [coachLevel, page]);

  const handleChangeFilter = (event) => {
    setCoachLevel(event.target.value);
    if (page !== 1) setPage(1);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    const targetElement = document.getElementById("list-coach-section");
    targetElement.scrollIntoView();
  };

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />

      <InfoQuillSection infoItems={infoItems} />

      <ListCoachContainer
        sx={{ px: 15, py: 7, minHeight: 1200, boxSizing: "border-box" }}
        id="list-coach-section"
      >
        <ImageBackdrop />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Outfit Variable', sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: 50,
              color: "white",
            }}
          >
            Our Highly Qualified Coaches
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              my: 2,
              alignItems: "center",
              alignSelf: "end",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Outfit Variable', sans-serif",
                fontSize: 19,
                fontWeight: 500,
                color: "white",
              }}
            >
              Coach Level:
            </Typography>
            <SelectStyled value={coachLevel} onChange={handleChangeFilter}>
              <MenuItemStyled value="all">All</MenuItemStyled>
              <MenuItemStyled value="Senior coach">Senior Coach</MenuItemStyled>
              <MenuItemStyled value="Junior coach">Junior Coach</MenuItemStyled>
            </SelectStyled>
          </Box>
          <Box sx={{ py: 5, px: 10 }}>
            <Grid container spacing={8}>
              {coachItems.map((item, idx) => (
                <Grid
                  item
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex" }}
                >
                  <CoachItem sx={{ flexGrow: 1 }} key={idx}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "55vh",
                        overflow: "hidden",
                        borderRadius: 5,
                      }}
                    >
                      <CoachImage
                        src={item.imageUrl}
                        alt="trans img"
                        onClick={() => navigate(`/coach-detail/${item.id}`)}
                      />
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
                </Grid>
              ))}
            </Grid>
          </Box>
          {coachItems.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                size="large"
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "'Outfit Variable', sans-serif",
                    color: "white",
                    fontSize: 17,
                    "&:hover": {
                      backgroundColor: "#d8c8f6",
                      color: "#221551",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#6e38d5 !important",
                    color: "white !important",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </ListCoachContainer>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default CoachPage;
