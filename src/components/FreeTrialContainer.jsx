import { Box } from "@mui/material";
import FreeTrialForm from "./FreeTrialForm";
import { ImageBackdrop } from "./ImageBackdrop";
import { useEffect, useState } from "react";
import axios from "axios";

const FreeTrialContainer = () => {

  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Free Trial Experience",
          },
        }
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundImage: `url(${data.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        boxSizing: "border-box",
        px: 20,
        py: 5,
      }}
    >
      <ImageBackdrop />
      <FreeTrialForm description={data.description} />
    </Box>
  );
};

export default FreeTrialContainer;
