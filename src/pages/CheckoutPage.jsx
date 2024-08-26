import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../utils/handleScroll";
import { useEffect, useState } from "react";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EastIcon from "@mui/icons-material/East";
import { ImageBackdrop } from "../components/ImageBackdrop";
import { formatNumberWithCommas } from "../utils/formatString";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const TitlePage = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 55,
  fontWeight: 600,
}));

const BackButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#6e38d5",
  fontSize: 17,
  fontWeight: 400,
  fontFamily: "'Outfit Variable', sans-serif",
  alignSelf: "center",
  borderRadius: 20,
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const ColCheckout = styled(Box)(() => ({
  boxSizing: "border-box",
}));

const TitleColBox = styled(Box)(() => ({
  display: "flex",
  gap: 10,
  fontSize: 20,
  alignItems: "center",
  marginBottom: 30,
}));

const IndexCol = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  backgroundColor: "#6e34d5",
  color: "white",
  fontSize: 18,
  borderRadius: "50%",
  width: 27,
  height: 27,
  textAlign: "center",
}));

const TitleCol = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 19,
  fontWeight: 600,
}));

const FormContainer = styled(Box)(() => ({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 25,
}));

const TextFieldItem = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-input::placeholder": {
    color: "#221551",
    opacity: 0.8,
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit Variable', sans-serif",
    backgroundColor: "white",
    fontSize: 19,
    color: "#221551",
    "& fieldset": {
      border: "1px solid #221551",
    },
    "&:hover fieldset": {
      border: "1px solid #221551",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #6e34d5",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: "17px",
    fontFamily: "'Outfit Variable', sans-serif",
    color: "#ea2c3e",
  },
}));

const SelectItem = styled(Select)(() => ({
  "& .MuiSelect-select": {
    fontFamily: "'Outfit Variable', sans-serif",
    fontSize: 19,
    color: "rgb(34, 21, 81)",
    backgroundColor: "white",
    paddingLeft: 24,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #221551",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #221551",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #6e34d5",
  },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
}));

const StyledRadioBtn = styled(FormControlLabel)(() => ({
  "& .MuiFormControlLabel-label": {
    fontFamily: "'Outfit Variable', sans-serif",
    fontSize: 19,
    color: "#221551",
    fontWeight: 400,
  },
  "& .MuiRadio-root.Mui-checked": {
    color: "#221551",
  },
}));

const ErrorText = styled(FormHelperText)(() => ({
  fontSize: "17px",
  fontFamily: "'Outfit Variable', sans-serif",
  color: "#ea2c3e",
}));

const NoteText = styled(Box)(() => ({
  padding: 20,
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
  backgroundColor: "rgba(110, 52, 113, 0.2)",
  color: "#221551",
  marginTop: 5,
  lineHeight: 1.5,
  borderRadius: 8,
}));

const PackageItem = styled(Box)(() => ({
  color: "white",
  borderRadius: 20,
}));

const ItemCheckout = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const DialogContentTextStyled = styled(DialogContentText)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 18,
}));

const CheckoutPage = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const storedPackage = localStorage.getItem("selectedPackage");
  const selectedPackage = storedPackage ? JSON.parse(storedPackage) : null;

  const storedFormData = localStorage.getItem("formData");

  useEffect(() => {
    if (!selectedPackage) {
      navigate("/");
      return;
    }
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      parsedData.dob = dayjs(parsedData.dob);
      parsedData.startDate = dayjs(parsedData.startDate);
      parsedData.endDate = dayjs(parsedData.endDate);
      setFormData(parsedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, selectedPackage, storedFormData]);

  const [listGyms, setListGyms] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: null,
    gym: "not-select",
    durationService: 1,
    startDate: dayjs().add(1, "day"),
    endDate: dayjs().add(1, "month").add(1, "day"),
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gym: "",
    durationService: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAccountsDialog, setOpenAccountsDialog] = useState(false);

  const getListGyms = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/gym/get-list-active-gym"
      );
      setListGyms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBankAccounts = async () => {
    try {
      const response = await axios.get(
        "https://eagle-fits.onrender.com/gms/api/v1/brand/get-brand-info"
      );
      setBankAccounts(JSON.parse(response.data.bankAccounts));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListGyms();
    getBankAccounts();
  }, []);

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseAccountsDialog = () => {
    setOpenAccountsDialog(false);
  };

  const handleViewBenefits = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleChangePayment = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "durationService" &&
      value !== "" &&
      (!/^\d+$/.test(value) ||
        parseInt(value, 10) < 1 ||
        parseInt(value, 10) > 60)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (name === "durationService") {
      setFormData((prevData) => ({
        ...prevData,
        endDate: prevData.startDate.add(value, "month"),
      }));
    }

    validateField(name, value);
  };

  const handleDateChange = (name, newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: newDate,
      endDate:
        name === "startDate"
          ? newDate.add(prevData.durationService, "month")
          : prevData.endDate,
    }));

    if (name === "dob") {
      validateField("dob", newDate);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "-" || event.key === ".") {
      event.preventDefault();
    }
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name can only contain letters and spaces.";
        }
        setErrors((prev) => ({ ...prev, name: error }));
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (
          // eslint-disable-next-line no-useless-escape
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          error = "Email is not valid.";
        }
        setErrors((prev) => ({ ...prev, email: error }));
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required.";
        } else if (!/^0\d{9,}$/.test(value)) {
          error = "Phone number must start with 0 and have at least 10 digits.";
        }
        setErrors((prev) => ({ ...prev, phone: error }));
        break;

      case "dob":
        if (!value) {
          error = "Date of birth is required.";
        } else {
          const minAge = 18;
          const currentDate = dayjs();
          const dobDate = dayjs(value);
          const age = currentDate.year() - dobDate.year();
          if (age < minAge) {
            error = `You must be at least ${minAge} years old.`;
          }
        }
        setErrors((prev) => ({ ...prev, dob: error }));
        break;

      case "gym":
        if (value === "not-select") {
          error = "Please select a gym.";
        }
        setErrors((prev) => ({ ...prev, gym: error }));
        break;

      case "durationService":
        if (!value) {
          error = "Service duration is required.";
        }
        setErrors((prev) => ({ ...prev, durationService: error }));
        break;

      default:
        break;
    }
    return error;
  };

  const handleSubmit = async () => {
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const phoneError = validateField("phone", formData.phone);
    const dobError = validateField("dob", formData.dob);
    const gymError = validateField("gym", formData.gym);
    const durationServiceError = validateField(
      "durationService",
      formData.durationService
    );

    // Kiểm tra xem có lỗi nào không
    if (
      nameError === "" &&
      emailError === "" &&
      phoneError === "" &&
      dobError === "" &&
      gymError === "" &&
      durationServiceError === ""
    ) {
      // Nếu không có lỗi, thực hiện mở dialog xác nhận
      if (paymentMethod === "transfer") {
        setOpenConfirmDialog(true);
      } else if (paymentMethod === "vnpay") {
        const formDataStorage = {
          ...formData,
          membershipId: selectedPackage.id,
          priceMonth: selectedPackage.priceMonth,
        };
        localStorage.setItem("formData", JSON.stringify(formDataStorage));
        localStorage.setItem("isSubmitRegisterService", "true");
        try {
          const response = await axios.get("https://eagle-fits.onrender.com/gms/api/v1/customer/get-pay-url", {
            params: {
              amount: Math.round(selectedPackage.priceMonth * formData.durationService * 25000)
            },
          });
          window.location.assign(response.data.url);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleConfirmRegister = async () => {
    try {
      await axios.post(
        "https://eagle-fits.onrender.com/gms/api/v1/customer/create-transfer-registration",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          dob: dayjs(formData.dob).format("YYYY-MM-DD"),
          gymId: formData.gym,
          membershipId: selectedPackage.id,
          startDate: dayjs(formData.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(formData.endDate).format("YYYY-MM-DD"),
          amount: selectedPackage.priceMonth * formData.durationService,
        }
      );
      localStorage.setItem("isSubmitRegisterService", "true");
      navigate("/success/register-transfer");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      {selectedPackage && (
        <Box>
          <Box sx={{ px: 20, py: 8, backgroundColor: "#f7f8ff" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <TitlePage>MEMBERSHIP REGISTRATION</TitlePage>
              <BackButton
                variant="contained"
                onClick={() => navigate("/service")}
                startIcon={<KeyboardBackspaceIcon />}
                sx={{ px: 3 }}
              >
                Back
              </BackButton>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <ColCheckout sx={{ width: "35%" }}>
                <TitleColBox>
                  <IndexCol>1</IndexCol>
                  <TitleCol>Member Information</TitleCol>
                </TitleColBox>

                <FormContainer component="form">
                  <TextFieldItem
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Fullname *"
                    helperText={errors.name}
                  />

                  <TextFieldItem
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    helperText={errors.email}
                  />

                  <TextFieldItem
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number *"
                    helperText={errors.phone}
                  />

                  <FormControl
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 3,
                    }}
                  >
                    <FormLabel
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551 !important",
                        fontWeight: 500,
                      }}
                    >
                      Gender *:
                    </FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <StyledRadioBtn
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <StyledRadioBtn
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <FormLabel
                        sx={{
                          fontFamily: "'Outfit Variable', sans-serif",
                          fontSize: 19,
                          color: "#221551 !important",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Date of Birth *:
                      </FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="dob"
                          value={formData.dob}
                          onChange={(newDate) =>
                            handleDateChange("dob", newDate)
                          }
                          inputFormat="DD/MM/YYYY"
                          renderInput={(params) => (
                            <TextFieldItem
                              {...params}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                    <ErrorText>{errors.dob}</ErrorText>
                  </FormControl>

                  <FormControl>
                    <SelectItem
                      name="gym"
                      value={formData.gym}
                      onChange={handleChange}
                    >
                      <MenuItemStyled value="not-select">
                        Gym you want to join *
                      </MenuItemStyled>
                      {listGyms.map((item, idx) => (
                        <MenuItemStyled key={idx} value={item.id}>
                          {item.name}
                        </MenuItemStyled>
                      ))}
                    </SelectItem>
                    <ErrorText>{errors.gym}</ErrorText>
                  </FormControl>

                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <FormLabel
                        sx={{
                          fontFamily: "'Outfit Variable', sans-serif",
                          fontSize: 19,
                          color: "#221551 !important",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Service duration (months)*:
                      </FormLabel>
                      <TextFieldItem
                        name="durationService"
                        type="number"
                        value={formData.durationService}
                        onChange={handleChange}
                        inputProps={{
                          min: 1,
                          max: 60,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          style: { textAlign: "center" },
                        }}
                        onKeyDown={handleKeyDown}
                      />
                    </Box>
                    <ErrorText>{errors.durationService}</ErrorText>
                  </FormControl>

                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 3,
                      }}
                    >
                      <FormLabel
                        sx={{
                          fontFamily: "'Outfit Variable', sans-serif",
                          fontSize: 19,
                          color: "#221551 !important",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Service start date *:
                      </FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="startDate"
                          value={formData.startDate}
                          onChange={(newDate) =>
                            handleDateChange("startDate", newDate)
                          }
                          inputFormat="DD/MM/YYYY"
                          minDate={dayjs().add(1, "day")}
                          renderInput={(params) => (
                            <TextFieldItem
                              {...params}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </FormControl>

                  <FormControl
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 3,
                    }}
                  >
                    <FormLabel
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551 !important",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Service end date:
                    </FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TextFieldItem
                        name="endDate"
                        value={formData.endDate.format("DD/MM/YYYY")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </FormContainer>
              </ColCheckout>

              <Divider
                orientation="vertical"
                sx={{ border: "1px solid #bbb" }}
                variant="middle"
                flexItem
              />

              <ColCheckout sx={{ width: "30%" }}>
                <TitleColBox>
                  <IndexCol>2</IndexCol>
                  <TitleCol>Payment Methods</TitleCol>
                </TitleColBox>

                <FormControl
                  sx={{
                    display: "flex",
                    gap: 3,
                  }}
                >
                  <RadioGroup
                    value={paymentMethod}
                    onChange={handleChangePayment}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <StyledRadioBtn
                        value="vnpay"
                        control={<Radio />}
                        label="Payment via VNPAY"
                      />
                      <NoteText>
                        Direct payment through the VNPAY transaction gateway
                      </NoteText>
                    </Box>
                    <Box>
                      <StyledRadioBtn
                        value="transfer"
                        control={<Radio />}
                        label="Bank transfer"
                      />
                      <NoteText>
                        For the Bank transfer method, please transfer the
                        payment to one of the accounts below. We will contact
                        you to confirm within the next 24 hours
                      </NoteText>
                      <Button
                        sx={{
                          textTransform: "none",
                          fontSize: 17,
                          textAlign: "left",
                          lineHeight: 1.5,
                          fontFamily: "'Outfit Variable', sans-serif",
                          color: "#6e34d5",
                          cursor: "pointer",
                          my: 2,
                          "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                          },
                        }}
                        endIcon={<EastIcon />}
                        onClick={() => setOpenAccountsDialog(true)}
                      >
                        View our list of accounts
                      </Button>
                      <Dialog
                        open={openAccountsDialog}
                        onClose={handleCloseAccountsDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle
                          sx={{
                            fontFamily: "'Outfit Variable', sans-serif",
                            fontSize: 23,
                          }}
                        >
                          Our Beneficiary Banks
                        </DialogTitle>
                        <IconButton
                          aria-label="close"
                          onClick={handleCloseAccountsDialog}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <DialogContent>
                          <DialogContentTextStyled>
                            Please transfer the payment to one of the bank
                            accounts listed below:
                          </DialogContentTextStyled>
                          <DialogContentTextStyled>
                            (Transfer format: NAME + PHONE NUMBER).
                          </DialogContentTextStyled>
                          <DialogContentTextStyled>
                            We will contact you for confirmation within the next
                            24 hours.
                          </DialogContentTextStyled>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 5,
                              my: 5,
                            }}
                          >
                            {bankAccounts.map((item, idx) => (
                              <Box key={idx} sx={{ display: "flex", gap: 3 }}>
                                <img
                                  src={item.qrCode}
                                  alt="qr code bank"
                                  width={180}
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      fontFamily:
                                        "'Outfit Variable', sans-serif",
                                      fontSize: 18,
                                    }}
                                    gutterBottom
                                  >
                                    Bank: {item.bank}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontFamily:
                                        "'Outfit Variable', sans-serif",
                                      fontSize: 18,
                                    }}
                                    gutterBottom
                                  >
                                    Account number: {item.accNumber}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontFamily:
                                        "'Outfit Variable', sans-serif",
                                      fontSize: 18,
                                    }}
                                    gutterBottom
                                  >
                                    Account owner: {item.owner}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </DialogContent>
                      </Dialog>
                    </Box>
                  </RadioGroup>
                </FormControl>
              </ColCheckout>

              <Divider
                orientation="vertical"
                sx={{ border: "1px solid #bbb" }}
                variant="middle"
                flexItem
              />

              <ColCheckout sx={{ width: "35%" }}>
                <TitleColBox>
                  <IndexCol>3</IndexCol>
                  <TitleCol>Membership Package Information</TitleCol>
                </TitleColBox>

                <PackageItem
                  sx={{
                    position: "relative",
                    width: "100%",
                    backgroundImage: `url(${selectedPackage.thumbnail})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    boxSizing: "border-box",
                    p: 4,
                  }}
                >
                  <ImageBackdrop sx={{ borderRadius: "20px" }} />
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 21,
                        fontWeight: 600,
                      }}
                    >
                      {selectedPackage.name?.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: "white",
                        fontSize: 65,
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontWeight: 700,
                      }}
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
                      {formatNumberWithCommas(
                        selectedPackage.priceMonth?.toString()
                      )}
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
                    <Divider sx={{ borderTop: "2px solid #88dbdf" }} />
                    <Typography
                      sx={{
                        fontSize: 17,
                        fontFamily: "'Outfit Variable', sans-serif",
                        marginTop: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {selectedPackage.description}
                    </Typography>
                  </Box>
                </PackageItem>

                <Box>
                  <Accordion
                    expanded={openDropdown}
                    onChange={handleViewBenefits}
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      my: 1,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                      sx={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "none",
                          fontSize: 19,
                          fontFamily: "'Outfit Variable', sans-serif",
                          color: "#221551",
                          fontWeight: 500,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        View All Benefits
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {selectedPackage.benefits
                          .filter((benefit) => benefit.included)
                          .map((benefit, idx) => (
                            <Typography
                              key={idx}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: 18,
                                fontWeight: 400,
                                fontFamily: "'Outfit Variable', sans-serif",
                                color: "#221551",
                              }}
                            >
                              <FiberManualRecordIcon
                                sx={{ fontSize: 12, marginRight: 1 }}
                              />
                              {benefit.benefit?.description}
                            </Typography>
                          ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>

                <Divider sx={{ borderTop: "1px solid #221551" }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    my: 3,
                  }}
                >
                  <ItemCheckout>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551",
                      }}
                    >
                      Service duration:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551",
                        fontWeight: 500,
                      }}
                    >
                      {formData.durationService} months
                    </Typography>
                  </ItemCheckout>
                  <ItemCheckout>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551",
                      }}
                    >
                      Total amount:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 19,
                        color: "#221551",
                        fontWeight: 500,
                      }}
                    >
                      {selectedPackage.priceMonth * formData.durationService} $
                    </Typography>
                  </ItemCheckout>
                </Box>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#6e38d5",
                      fontSize: 19,
                      fontWeight: 400,
                      fontFamily: "'Outfit Variable', sans-serif",
                      alignSelf: "flex-end",
                      color: "white",
                      width: "20vh",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#4919a4",
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    {paymentMethod === "vnpay" ? "Pay" : "Submit"}
                  </Button>
                </Box>

                <Dialog
                  open={openConfirmDialog}
                  onClose={handleCloseConfirmDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    sx={{
                      fontFamily: "'Outfit Variable', sans-serif",
                      fontSize: 23,
                    }}
                  >
                    Confirm Registration Submission
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseConfirmDialog}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent>
                    <DialogContentTextStyled>
                      Are you sure you want to submit the registration? This
                      action cannot be undone. We will contact you to confirm
                      within the next 24 hours.
                    </DialogContentTextStyled>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 17,
                        color: "#6e34d5",
                      }}
                      onClick={handleCloseConfirmDialog}
                    >
                      CANCEL
                    </Button>
                    <Button
                      sx={{
                        fontFamily: "'Outfit Variable', sans-serif",
                        fontSize: 17,
                        color: "#6e34d5",
                      }}
                      onClick={handleConfirmRegister}
                      autoFocus
                    >
                      CONFIRM
                    </Button>
                  </DialogActions>
                </Dialog>
              </ColCheckout>
            </Box>
          </Box>

          <FreeTrialContainer />
          <TopBlogsContainer />
        </Box>
      )}
    </Box>
  );
};

export default CheckoutPage;
