import { Box } from "@mui/material";
import FreeTrialForm from "../components/FreeTrialForm";
import { ImageBackdrop } from "../components/ImageBackdrop";
import { useScrollToTop } from "../utils/handleScroll";
import { InfoQuillSection } from "../components/InfoSection";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const FreeTrialPage = () => {
  useScrollToTop();

  const [infoIntro, setInfoIntro] = useState({});
  const [infoItems, setInfoItems] = useState([]);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Free Trial Experience",
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
            page: "Free Trial Page",
          },
        }
      );
      setInfoItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getGeneralInfo();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundImage: `url(${infoIntro.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          boxSizing: "border-box",
          px: 20,
          py: 5,
          height: "80vh",
        }}
      >
        <ImageBackdrop />
        <FreeTrialForm description={infoIntro.description} />
      </Box>

      <InfoQuillSection infoItems={infoItems} />

      <TopBlogsContainer />
    </Box>
  );
};

export default FreeTrialPage;
