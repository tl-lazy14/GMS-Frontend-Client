import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import './Quill.css';

const InfoSectionContainer = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "#f7f8ff",
  display: "flex",
  flexDirection: "column",
  gap: 100,
}));

const InfoItem = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

const InfoItemTitle = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: 55,
  wordSpacing: 8,
}));

const InfoItemDes = styled(Typography)(() => ({
  fontFamily: "'Outfit Variable', sans-serif",
  marginTop: 20,
  color: "#3b4555",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: 1.5,
}));

export const InfoSection = ({ infoItems }) => {
  return (
    <InfoSectionContainer sx={{ px: 20, py: 7, boxSizing: "border-box" }}>
      {infoItems.map((item, idx) => (
        <InfoItem key={idx} sx={{ my: 5 }}>
          <Box sx={{ width: "70vh", marginTop: 3 }}>
            <InfoItemTitle variant="h2">{item.title}</InfoItemTitle>
            <InfoItemDes>{item.content}</InfoItemDes>
          </Box>
          <img
            style={{ width: "82vh", objectFit: 'cover', borderRadius: 20 }}
            src={item.image}
            alt="info img"
            loading="lazy"
          />
        </InfoItem>
      ))}
    </InfoSectionContainer>
  );
};

export const InfoQuillSection = ({ infoItems }) => {
  return (
    <InfoSectionContainer sx={{ px: 20, py: 5, boxSizing: "border-box" }}>
      {infoItems.map((item, idx) => (
        <InfoItem key={idx} sx={{ my: 5 }}>
          <Box sx={{ width: "70vh", marginTop: 3 }}>
            <InfoItemTitle variant="h2">{item.title}</InfoItemTitle>
            <div
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: item.description }}
              style={{
                fontFamily: "'Outfit Variable', sans-serif",
                marginTop: 20,
                color: "#3b4555",
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 1.5,
              }}
            />
          </Box>
          <img
            style={{ width: "82vh", objectFit: 'cover', borderRadius: 20 }}
            src={item.image}
            alt="info img"
            loading="lazy"
          />
        </InfoItem>
      ))}
    </InfoSectionContainer>
  );
};
