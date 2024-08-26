import {
  Box,
  Button,
  Grid,
  Pagination,
  Slider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import IntroPageSection from "../components/IntroPageSection";
import { useScrollToTop } from "../utils/handleScroll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const optionFilterGender = ["All", "Male", "Female"];
const optionFilterAge = ["All", "18+", "30+", "40+"];

const FilterSection = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Title = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 500,
  fontFamily: "'Outfit Variable', sans-serif",
}));

const OptionFilterButton = styled(Button)(() => ({
  fontWeight: 500,
  fontFamily: "'Outfit Variable', sans-serif",
  color: "#221551",
  border: "2px solid #6e38d5",
  textTransform: "none",
  fontSize: 16,
  flexGrow: 1,
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#221551",
    color: "white",
    border: "2px solid #221551",
  },
}));

const PrettoSlider = styled(Slider)({
  color: "#6e38d5",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  marginTop: 10,
});

const TransItem = styled(Box)(() => ({}));

const TransImage = styled("img")(() => ({
  width: "100%",
  height: "55vh",
  borderRadius: 5,
  cursor: "pointer",
  transition: "0.3s",
  objectFit: "cover",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const ListTransPage = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const [transItems, setTransItems] = useState([]);
  const [infoIntro, setInfoIntro] = useState({});
  const [gender, setGender] = useState("All");
  const [age, setAge] = useState("All");
  const [numWeeks, setNumWeeks] = useState([0, 50]);
  const [initialNumWeeks, setInitialNumWeeks] = useState([0, 50]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Transformation",
          },
        }
      );
      setInfoIntro(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
  }, []);

  const getListResults = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/customer/get-list-result`,
        {
          params: {
            gymId: "all",
            gender: gender,
            age: age !== "All" ? parseInt(age.split("+")[0], 10) : 0,
            minNumWeeks: numWeeks[0],
            maxNumWeeks: numWeeks[1],
            keyword: "",
            page: page,
          },
        }
      );
      setTransItems(response.data.listItem);
      setTotalPages(Math.floor(response.data.numItem / 9) + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListResults();
  }, [gender, age, numWeeks, page]);

  const handlePageChange = (event, page) => {
    setPage(page);
    const targetElement = document.getElementById("main-section");
    targetElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setNumWeeks([Math.min(newValue[0], numWeeks[1] - 5), numWeeks[1]]);
    } else {
      setNumWeeks([numWeeks[0], Math.max(newValue[1], numWeeks[0] + 5)]);
    }
  };

  const handleSliderRelease = () => {
    if (
      numWeeks[0] !== initialNumWeeks[0] ||
      numWeeks[1] !== initialNumWeeks[1]
    ) {
      setTimeout(() => {
        setPage(1);
        setInitialNumWeeks([...numWeeks]);
      }, 1000);
    }
  };

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />
      <Box sx={{ px: 20, py: 5, backgroundColor: "#f7f8ff" }} id="main-section">
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500,
            fontFamily: "'Outfit Variable', sans-serif",
          }}
        >
          Filter by
        </Typography>

        <FilterSection sx={{ py: 2 }}>
          <Box>
            <Title>Gender</Title>
            <Box sx={{ display: "flex", gap: 1.5, py: 1.5 }}>
              {optionFilterGender.map((item, idx) => (
                <OptionFilterButton
                  key={idx}
                  onClick={() => {
                    if (gender !== item) {
                      setGender(item);
                      setPage(1);
                    }
                  }}
                  sx={{
                    backgroundColor:
                      gender === item ? "#6e38d5 !important" : "transparent",
                    border:
                      gender === item
                        ? "2px solid #6e38d5 !important"
                        : "2px solid #221551",
                    color: gender === item ? "white" : "#221551",
                  }}
                >
                  {item}
                </OptionFilterButton>
              ))}
            </Box>
          </Box>
          <Box>
            <Title>Age</Title>
            <Box sx={{ display: "flex", gap: 1.5, py: 1.5 }}>
              {optionFilterAge.map((item, idx) => (
                <OptionFilterButton
                  key={idx}
                  onClick={() => {
                    if (age !== item) {
                      setAge(item);
                      setPage(1);
                    }
                  }}
                  sx={{
                    backgroundColor:
                      age === item ? "#6e38d5 !important" : "transparent",
                    border:
                      age === item
                        ? "2px solid #6e38d5 !important"
                        : "2px solid #221551",
                    color: age === item ? "white" : "#221551",
                  }}
                >
                  {item}
                </OptionFilterButton>
              ))}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Title>Workout Time: </Title>
              <Typography
                sx={{
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 18,
                    backgroundColor: "#6e38d5",
                    color: "white",
                    borderRadius: "50%",
                    width: 35,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {numWeeks[0]}
                </Typography>{" "}
                -{" "}
                <Typography
                  sx={{
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 18,
                    backgroundColor: "#6e38d5",
                    color: "white",
                    borderRadius: "50%",
                    width: 35,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {numWeeks[1]}
                </Typography>{" "}
                Weeks
              </Typography>
            </Box>
            <Box>
              <PrettoSlider
                value={numWeeks}
                valueLabelDisplay="off"
                aria-label="pretto slider"
                onChange={handleChangeSlider}
                onChangeCommitted={handleSliderRelease}
                disableSwap
                max={50}
              />
            </Box>
          </Box>
        </FilterSection>

        <Box sx={{ py: 5 }}>
          <Grid container spacing={10}>
            {transItems.map((item, idx) => (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex" }}
              >
                <TransItem key={idx}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "55vh",
                      overflow: "hidden",
                      borderRadius: 5,
                    }}
                  >
                    <TransImage
                      src={item.imageUrl}
                      alt="trans img"
                      loading="lazy"
                      onClick={() =>
                        navigate(`/transformation-detail/${item.id}`)
                      }
                    />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#221551",
                      fontWeight: 500,
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
                    onClick={() =>
                      navigate(`/transformation-detail/${item.id}`)
                    }
                  >
                    {item.memberService.member.name}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#1976d2",
                      fontFamily: "'Outfit Variable', sans-serif",
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                  >
                    {item.numWeeks} Weeks
                  </Typography>
                </TransItem>
              </Grid>
            ))}
          </Grid>
        </Box>

        {transItems.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              size="large"
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Outfit Variable', sans-serif",
                  color: "#221551",
                  fontSize: 17,
                  "&:hover": {
                    backgroundColor: "#d8c8f6",
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
      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default ListTransPage;
