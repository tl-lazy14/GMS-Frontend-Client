import {
  Box,
  Button,
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
import { useScrollToTop } from "../utils/handleScroll";
import IntroPageSection from "../components/IntroPageSection";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { getFirstParagraph } from "../utils/formatString";
import axios from "axios";

const listCategories = [
  {
    id: 1,
    name: "News & Events",
  },
  {
    id: 2,
    name: "Workout Knowledge",
  },
  {
    id: 3,
    name: "Exercises",
  },
  {
    id: 4,
    name: "Nutrition",
  },
  {
    id: 5,
    name: "Health Guides",
  },
  {
    id: 6,
    name: "Workout Stories",
  },
];

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

const BlogItem = styled(Box)(() => ({
  border: "1px solid #ccc",
  backgroundColor: "white",
  borderRadius: 20,
}));

const BlogImage = styled("img")(() => ({
  width: "100%",
  height: "35vh",
  objectFit: "cover",
  borderRadius: "20px 20px 0 0",
  cursor: "pointer",
}));

const ReadMoreButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e34d5",
  fontSize: 17,
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  color: "white",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#221551",
  },
}));

const BlogPage = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const [infoIntro, setInfoIntro] = useState({});
  const [blogItems, setBlogItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Blog",
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

  const getListArticles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2002/gms/api/v1/article/get-list-article`,
        {
          params: {
            category: category,
            status: "Published",
            keyword: keyword,
            page: page,
          },
        }
      );
      setBlogItems(response.data.listArticles);
      setTotalPages(Math.floor(response.data.numArticles / 9) + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListArticles();
  }, [category, keyword, page]);

  const handlePageChange = (event, page) => {
    setPage(page);
    const targetElement = document.getElementById("main-section");
    targetElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeFilter = (event) => {
    setCategory(event.target.value);
    if (page !== 1) setPage(1);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    if (page !== 1) setPage(1);
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 500,
                fontFamily: "'Outfit Variable', sans-serif",
                color: "#221551",
              }}
            >
              Category:
            </Typography>
            <SelectItem value={category} onChange={handleChangeFilter}>
              <MenuItemStyled value="all">All Blogs</MenuItemStyled>
              {listCategories.map((item) => (
                <MenuItemStyled key={item.id} value={item.name}>
                  {item.name}
                </MenuItemStyled>
              ))}
            </SelectItem>
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
            {blogItems.map((item, idx) => (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex" }}
              >
                <BlogItem item={item} sx={{ flexGrow: 1 }}>
                  <BlogImage
                    src={item.thumbnail}
                    alt="featured img blog"
                    onClick={() => navigate(`/blog/detail/${item.id}`)}
                  />
                  <Box sx={{ px: 3, py: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 20,
                        lineHeight: 1.3,
                        fontFamily: "'Outfit Variable', sans-serif",
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": {
                          color: "#6e38d5",
                        },
                      }}
                      onClick={() => navigate(`/blog/detail/${item.id}`)}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: 17,
                        fontWeight: 400,
                        lineHeight: 1.3,
                        fontFamily: "'Outfit Variable', sans-serif",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: getFirstParagraph(item.content),
                      }}
                    />
                    <ReadMoreButton
                      onClick={() => navigate(`/blog/detail/${item.id}`)}
                      sx={{ my: 3, px: 3 }}
                    >
                      Read more
                    </ReadMoreButton>
                  </Box>
                </BlogItem>
              </Grid>
            ))}
          </Grid>
        </Box>

        {blogItems.length > 0 && (
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
    </Box>
  );
};

export default BlogPage;
