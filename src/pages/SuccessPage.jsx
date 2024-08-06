import { Box, Button, Typography } from "@mui/material";
import TopBlogsContainer from "../components/TopBlogsContainer";
import { useScrollToTop } from "../utils/handleScroll";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImg from "../assets/bg-success.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ImageBackdrop } from "../components/ImageBackdrop";
import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const SuccessPage = () => {
  useScrollToTop();

  const { type } = useParams();
  const navigate = useNavigate();

  const isSubmitRegisterService = localStorage.getItem(
    "isSubmitRegisterService"
  );

  const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));

  useEffect(() => {
    if (!isSubmitRegisterService && type !== "free-trial") {
      navigate("/");
      return;
    }

    // Check if user is navigating away from SuccessPage
    let navigatingAway = false;

    const handleBeforeUnload = (event) => {
      // Prevent the prompt when the user navigates away manually
      event.preventDefault();
      // Set flag to true indicating that user is navigating away
      navigatingAway = true;
      // Remove the event listener to avoid the prompt appearing during navigation
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

    // Listen for beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Call API when type is register-vnpay
    if (type === "register-vnpay") {
      const formData = JSON.parse(localStorage.getItem("formData"));

      axios.post("http://localhost:2002/gms/api/v1/customer/add-member", {
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        gender: formData?.gender,
        dob: dayjs(formData?.dob).format("YYYY-MM-DD"),
        gymId: formData?.gym,
        membershipId: formData?.membershipId,
        startDate: dayjs(formData?.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(formData?.endDate).format("YYYY-MM-DD"),
        amount: formData?.priceMonth * formData?.durationService,
      }).then(() => {
        localStorage.removeItem("formData");
        localStorage.removeItem("isSubmitRegisterService");
        localStorage.removeItem("selectedPackage");
      }).catch((error) => {
        console.error("Failed to register member:", error);
      });;
    }

    // Cleanup function
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Check if user is not navigating away from SuccessPage
      if (!navigatingAway && type !== "free-trial") {
        if (type === "register-vnpay") {
          localStorage.removeItem("formData");
        }
        localStorage.removeItem("isSubmitRegisterService");
        localStorage.removeItem("selectedPackage");
      }
    };
  }, [isSubmitRegisterService, navigate, type]);

  return (
    <Box>
      {(isSubmitRegisterService || type === "free-trial") && (
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              backgroundImage: `url(${backgroundImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              boxSizing: "border-box",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              px: 20,
              py: 7,
            }}
          >
            <ImageBackdrop />
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: 1,
              }}
            >
              <CheckCircleIcon sx={{ color: "#28a745", fontSize: 120 }} />
              <Typography
                sx={{
                  color: "white",
                  fontSize: 55,
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontWeight: 600,
                  wordSpacing: 10,
                  textAlign: "center",
                }}
              >
                {type === "free-trial" && "REGISTRATION SUBMITTED SUCCESSFULLY"}
                {type === "register-vnpay" &&
                  "MEMBERSHIP REGISTRATION SUCCESSFULLY"}
                {type === "register-transfer" &&
                  "REGISTRATION SUBMITTED SUCCESSFULLY"}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 23,
                  fontFamily: "'Outfit Variable', sans-serif",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {type === "free-trial" &&
                  `You have successfully submitted a request for the free-trial service. We will contact you within 24 hours at your preferred time. Thank you for choosing us.`}
                {type === "register-vnpay" &&
                  `You have successfully registered for the ${selectedPackage?.name} membership package. We will send an email regarding your service registration details to you. Thank you for choosing us. Wishing you a great workout time.`}
                {type === "register-transfer" &&
                  `You have successfully submitted the registration for the ${selectedPackage?.name} service package. We will contact you to confirm payment information within 24 hours. You will receive an email with detailed information once we have confirmed. Thank you for choosing us.`}
              </Typography>
              <Button
                sx={{
                  textTransform: "none",
                  backgroundColor: "#6e38d5",
                  fontSize: 19,
                  fontWeight: 400,
                  fontFamily: "'Outfit Variable', sans-serif",
                  alignSelf: "center",
                  px: 5,
                  py: 1,
                  my: 2,
                  borderRadius: 20,
                  color: "white",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#4919a4",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Back to Homepage
              </Button>
            </Box>
          </Box>
          <TopBlogsContainer />
        </Box>
      )}
    </Box>
  );
};

export default SuccessPage;
