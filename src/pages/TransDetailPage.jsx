import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useScrollToTop } from "../utils/handleScroll";
import { styled } from "@mui/material/styles";
import EastIcon from "@mui/icons-material/East";
import "../components/Quill.css";
import FreeTrialContainer from "../components/FreeTrialContainer";
import TopBlogsContainer from "../components/TopBlogsContainer";
import BG from "../assets/bg4.png";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import QuillContent from "../components/QuillContent";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const TitlePage = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 55,
  fontWeight: 600,
}));

const TitleSection = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 23,
  fontWeight: 600,
  marginTop: 25,
  marginBottom: 20,
}));

const Text = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 18,
  marginTop: 20,
  marginBottom: 20,
  color: "#111",
}));

const MemberName = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 40,
  fontWeight: 600,
  padding: 0,
}));

const TransImage = styled("img")(() => ({
  width: "65vh",
  borderRadius: 16,
  objectFit: "cover",
}));

const OtherTransImage = styled("img")(() => ({
  width: "50vh",
  height: "45vh",
  borderRadius: "16px 16px 0 0",
  objectFit: "cover",
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontSize: 17,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6e38d5",
    color: "white",
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

const OtherTransSection = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
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

const TransDetailPage = () => {
  useScrollToTop();
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [otherItems, setOtherItems] = useState([]);
  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/customer/get-training-result/${id}`
      );
      setData(response.data);
      setAge(
        dayjs().diff(dayjs(response.data.memberService?.member?.dob), "year")
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getOtherItems = async () => {
    try {
      const response = await axios.get(
        `https://eagle-fits.onrender.com/gms/api/v1/customer/get-other-result/${id}`
      );
      setOtherItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    getOtherItems();
  }, [id]);

  return (
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
          <TitlePage>TRANSFORMATION STORY</TitlePage>
          <BackButton
            variant="contained"
            onClick={() => navigate("/transformation")}
            startIcon={<KeyboardBackspaceIcon />}
            sx={{ px: 3 }}
          >
            Back to List
          </BackButton>
        </Box>
        {!loading && (
          <Box sx={{ display: "flex", width: "100%", gap: 5 }}>
            <Box>
              <TransImage src={data.imageUrl} alt="trans img" />
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#221551",
                  fontFamily: "'Outfit Variable', sans-serif",
                  fontSize: 23,
                  fontWeight: 500,
                  my: 1,
                }}
              >
                {data.numWeeks} Weeks
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                fontFamily: "'Outfit Variable', sans-serif",
              }}
            >
              {age < 25 ? (
                <MemberName>
                  {data.memberService?.member?.name} / Age: {age}
                </MemberName>
              ) : (
                <MemberName>
                  {data.memberService?.member?.gender === "male"
                    ? "Mr. "
                    : "Ms. "}
                  {data.memberService?.member?.name} / Age: {age}
                </MemberName>
              )}
              <Text>"{data.shareContent}"</Text>
              <Text>{data.description}</Text>
              <Box>
                <TitleSection>Workout results:</TitleSection>
                <TableContainer>
                  <Table sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Before</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>After</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.measurement &&
                        JSON.parse(data?.measurement).map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              sx={{
                                textTransform: "capitalize",
                                fontWeight: 500,
                              }}
                            >
                              {item.key}
                            </StyledTableCell>
                            <StyledTableCell>
                              {item.before} {item.unit}
                            </StyledTableCell>
                            <StyledTableCell>
                              <EastIcon
                                sx={{ fontSize: 23, verticalAlign: "middle" }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              {item.after} {item.unit}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <TitleSection>Issues before workout:</TitleSection>
                <QuillContent content={data.preIssues} />
              </Box>
              <Box>
                <TitleSection>Training program:</TitleSection>
                <QuillContent content={data.programDescription} />
              </Box>
              <Box>
                <TitleSection>Nutrition plan:</TitleSection>
                <QuillContent content={data.nutritionPlan} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <OtherTransSection sx={{ px: 20, py: 7, boxSizing: "border-box" }}>
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
          Read more stories
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {otherItems.length > 0 && otherItems.map((item, idx) => (
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              key={idx}
              onClick={() =>
                navigate(`/transformation-detail/${item.id}`)
              }
            >
              <OtherTransImage
                src={item.imageUrl}
                alt="trans img"
                loading="lazy"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, py: 1 }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#221551",
                    fontWeight: 500,
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 23,
                    transition: "0.3s",
                  }}
                  className="trans-name"
                >
                  {item.memberService?.member?.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#221551",
                    fontFamily: "'Outfit Variable', sans-serif",
                    fontSize: 20,
                    paddingBottom: 1,
                  }}
                >
                  {item.numWeeks} Weeks
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </OtherTransSection>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default TransDetailPage;
