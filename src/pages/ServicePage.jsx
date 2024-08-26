import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useScrollToTop } from "../utils/handleScroll";
import { useNavigate } from "react-router-dom";
import IntroPageSection from "../components/IntroPageSection";
import { ImageBackdrop } from "../components/ImageBackdrop";
import BG from "../assets/bg2.jpg";
import BG4 from "../assets/bg4.png";
import React, { useEffect, useState } from "react";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { InfoQuillSection } from "../components/InfoSection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";

const MemPackgageSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG4})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const TitleSection = styled(Typography)(() => ({
  color: "white",
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 40,
  textAlign: "center",
  fontWeight: 600,
  marginBottom: 30,
}));

const PackageItem = styled(Box)(({ isSelected }) => ({
  position: "relative",
  backgroundColor: "#fefefe",
  color: "#555",
  borderRadius: 20,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  transition: "0.3s",
  zIndex: 2,
  cursor: "pointer",
  "&:hover .package-item-background-img": {
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
  ...(isSelected && {
    color: "white",
    "& .package-item-background-img": {
      opacity: 1,
      zIndex: -1,
    },
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
  }),
}));

const PackageItemBackgroundImg = styled("img")(() => ({
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

const RegisterButton = styled(Button)(() => ({
  backgroundColor: "#6e38d5",
  marginTop: 50,
  fontSize: 20,
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 600,
  alignSelf: "center",
  borderRadius: 50,
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 18,
  color: "#221551",
  border: "1px solid #ccc",
  borderTop: "none",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6e38d5",
    color: "white",
    fontSize: 19,
    "&:first-child": {
      borderLeft: "1px solid #6e38d5",
    },
    "&:last-child": {
      borderRight: "none",
    },
  },
}));

const ServicePage = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const [infoIntro, setInfoIntro] = useState({});
  const [infoService, setInfoService] = useState([]);
  const [dataPackages, setDataPackages] = useState([]);
  const [dataBenefits, setDataBenefits] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Service",
          },
        }
      );
      setInfoIntro(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getServiceInfo = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/content-website/get-list-general-info",
        {
          params: {
            page: "Service Page",
          },
        }
      );
      setInfoService(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListBenefit = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/service/get-all-benefit"
      );
      setDataBenefits(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListMembershipPackage = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/service/get-active-membership-package-with-benefit"
      );
      const memberships = response.data;
      const formattedMemberships = memberships.map((membership) => ({
        id: membership.id,
        name: membership.name,
        thumbnail: membership.thumbnail,
        priceMonth: membership.priceMonth,
        description: membership.description,
        benefits: membership.benefits.map((benefit) => ({
          benefit: {
            id: benefit.id,
            description: benefit.description,
          },
          included: benefit.included,
        })),
      }));
      setDataPackages(formattedMemberships);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getServiceInfo();
    getListMembershipPackage();
    getListBenefit();
  }, []);

  const handleClickRegister = () => {
    if (selectedPackage === null) {
      setOpenAlert(true);
      return;
    } else {
      localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
      navigate("/service/checkout");
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />

      <MemPackgageSection
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
            {dataPackages.length > 0 &&
              dataPackages.map((item, idx) => (
                <Grid
                  item
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex" }}
                >
                  <PackageItem
                    isSelected={
                      selectedPackage !== null && selectedPackage.id === item.id
                    }
                    onClick={() => setSelectedPackage(item)}
                    sx={{
                      p: 4,
                      flexGrow: 1,
                      outline:
                        selectedPackage !== null &&
                        selectedPackage.id === item.id
                          ? "10px solid #6e34d5"
                          : "",
                      transition: "outline 0s",
                    }}
                  >
                    <PackageItemBackgroundImg
                      className="package-item-background-img"
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
                      {item.name?.toUpperCase()}
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
                      {item.priceMonth}
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
                  </PackageItem>
                </Grid>
              ))}
          </Grid>
        </Box>
        <RegisterButton
          variant="contained"
          sx={{ px: 5, py: 1.2 }}
          onClick={handleClickRegister}
        >
          REGISTER NOW
        </RegisterButton>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            variant="filled"
            sx={{
              maxWidth: "35vw",
              fontFamily: "'Outfit Variable', sans-serif",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              fontWeight: 400,
            }}
          >
            Please select a membership package!
          </Alert>
        </Snackbar>
      </MemPackgageSection>

      <Box
        sx={{
          px: 20,
          py: 7,
          position: "relative",
          width: "100%",
          backgroundImage: `url(${BG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      >
        <ImageBackdrop />
        <Box sx={{ position: "relative" }}>
          <TableContainer>
            <Table sx={{ backgroundColor: "white" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  {dataPackages.map((item) => (
                    <StyledTableCell key={item.id} align="center">
                      {item.name}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBenefits.map((benefit) => (
                  <StyledTableRow key={benefit.id}>
                    <StyledTableCell
                      sx={{ width: "50vh" }}
                      component="th"
                      scope="row"
                    >
                      {benefit.description}
                    </StyledTableCell>
                    {dataPackages.map((item) => (
                      <StyledTableCell
                        key={`${item.id}-${benefit.id}`}
                        align="center"
                      >
                        {item.benefits.find((b) => b.benefit.id === benefit.id)
                          ?.included && (
                          <CheckCircleIcon
                            sx={{ color: "#28a745", fontSize: 25 }}
                          />
                        )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <InfoQuillSection infoItems={infoService} />

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default ServicePage;
