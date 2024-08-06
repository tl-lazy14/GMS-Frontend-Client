import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const timeContactAvail = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 5:00 PM",
  "5:00 PM - 9:00 PM",
];

const Title = styled(Typography)(() => ({
  color: "white",
  fontSize: 60,
  fontWeight: 700,
  fontFamily: "'Outfit Variable', sans-serif",
  lineHeight: 1.3,
}));

const Description = styled(Typography)(() => ({
  color: "white",
  fontSize: 17,
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 300,
}));

const FormContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 25,
}));

const TextFieldItem = styled(TextField)(() => ({
  "& .MuiInputBase-input::placeholder": {
    color: "black",
    opacity: 0.8,
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Outfit Variable', sans-serif",
    backgroundColor: "white",
    fontSize: 19,
    color: "rgba(0, 0, 0, 0.8)",
    paddingLeft: 10,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #ced4da",
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
    color: "rgba(0, 0, 0, 0.8)",
    backgroundColor: "white",
    paddingLeft: 24,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #ced4da",
  },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
}));

const SubmitButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#6e38d5",
  borderRadius: 50,
  fontSize: 19,
  width: "30vh",
  fontWeight: 600,
  fontFamily: "'Outfit Variable', sans-serif",
  margin: "auto",
  marginTop: 10,
  "&:hover": {
    backgroundColor: "#4919a4",
  },
}));

const ErrorText = styled(FormHelperText)(() => ({
  fontSize: "17px",
  fontFamily: "'Outfit Variable', sans-serif",
  color: "#ea2c3e",
}));

const FreeTrialForm = ({ description }) => {
  const navigate = useNavigate();

  const [listGym, setListGym] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    club: "not-select",
    timeContact: "not-select",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    club: "",
    timeContact: "",
  });

  const getListGyms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/gym/get-list-active-gym"
      );
      setListGym(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListGyms();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
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
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required.";
        } else if (!/^0\d{9,}$/.test(value)) {
          error = "Phone number must start with 0 and have at least 10 digits.";
        }
        setErrors((prev) => ({ ...prev, phone: error }));
        break;
      case "club":
        if (value === "not-select") {
          error = "Please select a gym.";
        }
        setErrors((prev) => ({ ...prev, club: error }));
        break;
      case "timeContact":
        if (value === "not-select") {
          error = "Please select a time.";
        }
        setErrors((prev) => ({ ...prev, timeContact: error }));
        break;
      default:
        break;
    }

    return error;
  };

  const handleSubmit = async () => {
    const nameError = validateField("name", formData.name);
    const phoneError = validateField("phone", formData.phone);
    const clubError = validateField("club", formData.club);
    const timeContactError = validateField("timeContact", formData.timeContact);

    // Kiểm tra xem có lỗi nào không
    if (!nameError && !phoneError && !clubError && !timeContactError) {
      try {
        await axios.post("http://localhost:2002/gms/api/v1/customer/register-free-trial", {
          name: formData.name,
          phone: formData.phone,
          gymId: formData.club,
          timeContact: formData.timeContact
        });
        navigate('/success/free-trial');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 15,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
      >
        <Title>FREE TRIAL EXPERIENCE</Title>
        <Description>{description}</Description>
      </Box>
      <FormContainer sx={{ p: 5 }} component="form" autoComplete="off">
        <TextFieldItem
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Fullname"
          helperText={errors.name}
        />
        <TextFieldItem
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          helperText={errors.phone}
        />
        <FormControl>
          <SelectItem name="club" value={formData.club} onChange={handleChange}>
            <MenuItemStyled value="not-select">
              Gym you want to join
            </MenuItemStyled>
            {listGym.map((item, idx) => (
              <MenuItemStyled key={idx} value={item.id}>
                {item.name}
              </MenuItemStyled>
            ))}
          </SelectItem>
          <ErrorText>{errors.club}</ErrorText>
        </FormControl>
        <FormControl>
          <SelectItem
            name="timeContact"
            value={formData.timeContact}
            onChange={handleChange}
          >
            <MenuItemStyled value="not-select">
              What time can we call you?
            </MenuItemStyled>
            {timeContactAvail.map((item, idx) => (
              <MenuItemStyled key={idx} value={item}>
                {item}
              </MenuItemStyled>
            ))}
          </SelectItem>
          <ErrorText>{errors.timeContact}</ErrorText>
        </FormControl>
        <SubmitButton sx={{ py: 1.2 }} onClick={handleSubmit}>
          REGISTER NOW
        </SubmitButton>
      </FormContainer>
    </Box>
  );
};

export default FreeTrialForm;
