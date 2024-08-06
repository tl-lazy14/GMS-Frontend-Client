import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FreeTrialContainer from "../components/FreeTrialContainer";
import { useScrollToTop } from "../utils/handleScroll";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import QuillContent from "../components/QuillContent";
import BG from "../assets/bg4.png";
import { getFirstParagraph } from "../utils/formatString";
import { useEffect, useState } from "react";
import axios from "axios";

const BackButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e38d5",
  fontSize: 17,
  fontWeight: 400,
  color: "white",
  fontFamily: "'Outfit Variable', sans-serif",
  alignSelf: "center",
  borderRadius: 20,
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const Title = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 60,
  lineHeight: 1.3,
  textTransform: "capitalize",
  fontWeight: 700,
}));

const Thumbnail = styled("img")(() => ({
  width: "100%",
  height: "90vh",
  objectFit: "cover",
  borderRadius: 40,
  objectPosition: "center center",
}));

const RelatedArticlesSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
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

const BlogDetailPage = () => {
  useScrollToTop();
  const { id } = useParams();

  const parseTagString = (tagString) => {
    // Kiểm tra xem tagString có rỗng không
    if (!tagString || tagString.trim() === "") {
      return [];
    }
    const tags = tagString.split("/");
    return tags.filter((tag) => tag.trim() !== "");
  };

  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({});
  const [otherItems, setOtherItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2002/gms/api/v1/article/get-article/${id}`
      );
      const articleInfo = response.data;
      setArticleData({
        ...articleInfo,
        tags: parseTagString(articleInfo.tags),
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getOtherItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2002/gms/api/v1/article/get-other-articles/${id}`
      );
      setOtherItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addView = async () => {
    try {
      await axios.put(`http://localhost:2002/gms/api/v1/article/add-view/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticle();
    getOtherItems();
    addView();
  }, [id]);

  return (
    <Box>
      {!loading && (
        <Box sx={{ px: 20, py: 8, backgroundColor: "#f7f8ff" }}>
          <BackButton
            onClick={() => navigate("/blog")}
            startIcon={<KeyboardBackspaceIcon />}
            sx={{ px: 3 }}
          >
            Back to List
          </BackButton>

          <Title sx={{ my: 4 }}>{articleData.title}</Title>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  fontSize: 19,
                  fontFamily: "'Outfit Variable', sans-serif",
                  color: "#6e34d5",
                }}
              >
                Tags:
              </Typography>
              <Typography
                sx={{
                  fontSize: 19,
                  fontFamily: "'Outfit Variable', sans-serif",
                  maxWidth: "40vw",
                }}
              >
                {articleData.tags.length === 1
                  ? articleData.tags[0]
                  : articleData.tags.join(" / ")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Typography
                sx={{
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontSize: 19,
                }}
              >
                {dayjs(articleData.publishedAt).format("dddd, MMMM D, YYYY")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontSize: 19,
                  border: "2px solid #221551",
                  py: 1,
                  px: 2,
                  borderRadius: 4,
                  backgroundColor: "#221551",
                  color: "white",
                }}
              >
                {articleData.category}
              </Typography>
            </Box>
          </Box>

          <Thumbnail
            src={articleData.thumbnail}
            alt="thumbnail img"
            sx={{ marginTop: 5, marginBottom: 2 }}
          />
          <Box sx={{ px: 20 }}>
            <QuillContent content={articleData.content} />
          </Box>
        </Box>
      )}

      <RelatedArticlesSection sx={{ px: 20, py: 7, boxSizing: "border-box" }}>
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
          Related articles
        </Typography>
        <Grid container spacing={5}>
          {otherItems.length > 0 && otherItems.map((item, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
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
      </RelatedArticlesSection>

      <FreeTrialContainer />
    </Box>
  );
};

export default BlogDetailPage;
