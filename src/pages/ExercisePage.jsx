import {
  Box,
  Dialog,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { useScrollToTop } from "../utils/handleScroll";
import IntroPageSection from "../components/IntroPageSection";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";

const SelectItem = styled(Select)(() => ({
  flexGrow: 1,
  "& .MuiSelect-select": {
    fontFamily: "'Outfit Variable', sans-serif",
    fontSize: 19,
    backgroundColor: "white",
    paddingLeft: 24,
    border: "1px solid #221551",
    minWidth: "30vh",
    color: "#221551",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #ced4da",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #6e34d5",
  },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
  color: "#221551",
}));

const TextFieldItem = styled(TextField)(() => ({
  "& .MuiInputBase-input::placeholder": {
    color: "#221551",
    opacity: 0.8,
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit Variable', sans-serif",
    backgroundColor: "white",
    fontSize: 19,
    color: "#221551",
    width: "50vh",
    "& fieldset": {
      border: "1px solid #221551",
    },
    "&:hover fieldset": {
      border: "2px solid #ced4da",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #6e34d5",
    },
  },
}));

const ExerciseItem = styled("Box")(() => ({
  cursor: "pointer",
  "&:hover": {
    "& .title-video": {
      color: "#6e34d5",
    },
    "& .des-video": {
      color: "#6e34d5",
    },
    "& .view-icon": {
      color: "rgba(256, 256, 256, 1)",
    },
  },
}));

const ExerciseImage = styled("img")(() => ({
  width: "100%",
  height: "30vh",
  objectFit: "cover",
}));

const ExercisePage = () => {
  useScrollToTop();

  const [infoIntro, setInfoIntro] = useState({});
  const [listCategories, setListCategories] = useState([]);
  const [exerciseItems, setExerciseItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Exercise Library",
          },
        }
      );
      setInfoIntro(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListExerciseCategory = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/exercise/get-list-category`
      );
      setListCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListExercise = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/exercise/get-list-exercise`,
        {
          params: {
            category: category,
            level: level,
            keyword: keyword,
            page: page,
          },
        }
      );
      setExerciseItems(response.data.listExercises);
      setTotalPages(Math.floor(response.data.numExercises / 9) + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getListExerciseCategory();
  }, []);

  useEffect(() => {
    getListExercise();
  }, [category, level, keyword, page]);

  const handlePageChange = (event, page) => {
    setPage(page);
    const targetElement = document.getElementById("main-section");
    targetElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    if (page !== 1) setPage(1);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
    if (page !== 1) setPage(1);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    if (page !== 1) setPage(1);
  };

  const handleOpenVideo = (item) => {
    setSelectedVideo(item);
    setOpenVideoDialog(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setOpenVideoDialog(false);
  };

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />

      <Box id="main-section" sx={{ px: 20, py: 8, backgroundColor: "#f7f8ff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "'Outfit Variable', sans-serif",
                  color: "#221551",
                }}
              >
                Filter:
              </Typography>
              <SelectItem value={category} onChange={handleChangeCategory}>
                <MenuItemStyled value="all">All categories</MenuItemStyled>
                {listCategories.map((item) => (
                  <MenuItemStyled key={item.id} value={item.id}>
                    {item.name}
                  </MenuItemStyled>
                ))}
              </SelectItem>
              <SelectItem value={level} onChange={handleChangeLevel}>
                <MenuItemStyled value="all">All levels</MenuItemStyled>
                <MenuItemStyled value="Beginner">Beginner</MenuItemStyled>
                <MenuItemStyled value="Intermediate">
                  Intermediate
                </MenuItemStyled>
                <MenuItemStyled value="Advanced">Advanced</MenuItemStyled>
              </SelectItem>
            </Box>
          </Box>

          <TextFieldItem
            value={keyword}
            onChange={handleSearch}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 30, marginRight: 0.5 }} />
                </InputAdornment>
              ),
              endAdornment:
                keyword !== "" ? (
                  <InputAdornment position="end">
                    <CancelIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setKeyword("");
                        if (page !== 1) setPage(1);
                      }}
                    />
                  </InputAdornment>
                ) : null,
            }}
          />
        </Box>

        <Box sx={{ py: 5 }}>
          <Grid container spacing={5}>
            {exerciseItems.map((item, idx) => (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex" }}
              >
                <ExerciseItem key={idx} onClick={() => handleOpenVideo(item)}>
                  <Box
                    sx={{ width: "100%", height: "30vh", position: "relative" }}
                  >
                    <ExerciseImage
                      src={item.thumbnail}
                      alt="thumbnail img video"
                    />
                    <YouTubeIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 80,
                        color: "rgba(256, 256, 256, 0.7)",
                        transition: "0.3s",
                      }}
                      className="view-icon"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      py: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 19,
                        lineHeight: 1.5,
                        fontFamily: "'Outfit Variable', sans-serif",
                        transition: "0.3s",
                      }}
                      className="title-video"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 17,
                        lineHeight: 1.5,
                        fontFamily: "'Outfit Variable', sans-serif",
                        transition: "0.3s",
                      }}
                      className="des-video"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </ExerciseItem>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog
          maxWidth="200vh"
          open={openVideoDialog}
          onClose={handleCloseVideo}
        >
          {selectedVideo !== null && (
            <iframe
              style={{ border: "none", backgroundColor: "transparent" }}
              width="1000"
              height="550"
              src={selectedVideo.youtubeUrl}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </Dialog>

        {exerciseItems.length > 0 && (
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

export default ExercisePage;
