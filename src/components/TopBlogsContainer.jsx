import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { getFirstParagraph } from "../utils/formatString";
import { useEffect, useState } from "react";
import axios from "axios";

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 50,
  fontFamily: "'Outfit Variable', sans-serif",
  wordSpacing: 3,
}));

const SeeAllButton = styled(Button)(() => ({
  color: "white",
  textTransform: "none",
  backgroundColor: "#6e38d5",
  borderRadius: 50,
  fontSize: 18,
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 30,
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

const TopBlogsContainer = () => {
  const navigate = useNavigate();

  const [listBlogs, setListBlogs] = useState([]);

  const getTopBlogs = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/article/get-top-articles"
      );
      setListBlogs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopBlogs();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#e1e1e1", px: 20, py: 10 }}>
      <Title>DON'T MISS OUT ON HELPFUL BLOGS</Title>
      <Box sx={{ display: "flex", justifyContent: "end", py: 2 }}>
        <SeeAllButton
          onClick={() => navigate("/blog")}
          sx={{ px: 4 }}
          endIcon={<ArrowRightAltIcon />}
        >
          See all
        </SeeAllButton>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Grid container spacing={5}>
          {listBlogs.map((item, idx) => (
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
      </Box>
    </Box>
  );
};

export default TopBlogsContainer;
