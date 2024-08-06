import { Box, MenuItem, Paper, Select, Typography } from "@mui/material";
import TopBlogsContainer from "../components/TopBlogsContainer";
import FreeTrialContainer from "../components/FreeTrialContainer";
import IntroPageSection from "../components/IntroPageSection";
import { InfoQuillSection } from "../components/InfoSection";
import { useScrollToTop } from "../utils/handleScroll";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  AppointmentTooltip,
  Appointments,
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";

const SelectItem = styled(Select)(() => ({
  flexGrow: 1,
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

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(() => ({
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#ffffff !important",
  },
  "&:focus": {
    backgroundColor: "#ffffff !important",
  },
}));

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(() => ({
  backgroundColor: "rgb(255, 250, 205)",
}));

const formatDayScaleDate = (date, options) => {
  const momentDate = moment(date);
  const { weekday } = options;
  return momentDate.format(weekday ? "dddd" : "D");
};

const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <StyledWeekViewTimeTableCell {...props} className="today-cell" />;
  }
  return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  return (
    <StyledWeekViewDayScaleCell {...props} formatDate={formatDayScaleDate} />
  );
};

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Box sx={{ px: 3 }}>
      <TextAppointment sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextAppointment sx={{ fontWeight: "bold" }}>Coach:</TextAppointment>{" "}
        {appointmentData.coach?.name}
      </TextAppointment>
      {appointmentData.description && (
        <TextAppointment>{appointmentData.description}</TextAppointment>
      )}
    </Box>
  </AppointmentTooltip.Content>
);

const TextAppointment = styled(Typography)(() => ({
  marginTop: 5,
  marginBottom: 5,
}));

const ClassSchedulePage = () => {
  useScrollToTop();

  const [infoIntro, setInfoIntro] = useState({});
  const [infoItems, setInfoItems] = useState([]);
  const [listGyms, setListGyms] = useState([]);
  const [listPrograms, setListPrograms] = useState([]);
  const [classSchedules, setClassSchedules] = useState([]);
  const [gym, setGym] = useState("not-select");
  const [program, setProgram] = useState("not-select");
  const [week, setWeek] = useState("not-select");
  const [dateViewState, setDateViewState] = useState(null);

  const getInfoIntro = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/content-website/get-intro-page",
        {
          params: {
            page: "Class",
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
            page: "Classes Page",
          },
        }
      );
      setInfoItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListGyms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/gym/get-list-active-gym"
      );
      setListGyms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListClassCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2002/gms/api/v1/class/get-list-category"
      );
      setListPrograms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getListClass = async () => {
    try {
      if (gym !== "not-select" && program !== "not-select") {
        const response = await axios.get(
          "http://localhost:2002/gms/api/v1/class/get-list-class",
          {
            params: {
              gymId: gym,
              categoryId: program,
            },
          }
        );
        setClassSchedules(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoIntro();
    getGeneralInfo();
    getListGyms();
    getListClassCategory();
  }, []);

  useEffect(() => {
    getListClass();
  }, [gym, program]);

  useEffect(() => {
    switch (week) {
      case "previous":
        setDateViewState(
          moment().subtract(1, "week").startOf("isoWeek").format("YYYY-MM-DD")
        );
        break;
      case "current":
        setDateViewState(moment().startOf("isoWeek").format("YYYY-MM-DD"));
        break;
      case "next":
        setDateViewState(
          moment().add(1, "week").startOf("isoWeek").format("YYYY-MM-DD")
        );
        break;
      default:
        setDateViewState(moment().startOf("isoWeek").format("YYYY-MM-DD"));
        break;
    }
  }, [week]);

  const getCurrentWeek = () => {
    const today = moment();
    const startOfWeek = today.clone().startOf("isoWeek");
    const endOfWeek = today.clone().endOf("isoWeek");

    return {
      start: startOfWeek.format("DD/MM/YYYY"),
      end: endOfWeek.format("DD/MM/YYYY"),
    };
  };

  const getPreviousWeek = () => {
    const today = moment();
    const startOfPreviousWeek = today
      .clone()
      .subtract(1, "week")
      .startOf("isoWeek");
    const endOfPreviousWeek = today
      .clone()
      .subtract(1, "week")
      .endOf("isoWeek");

    return {
      start: startOfPreviousWeek.format("DD/MM/YYYY"),
      end: endOfPreviousWeek.format("DD/MM/YYYY"),
    };
  };

  const getNextWeek = () => {
    const today = moment();
    const startOfNextWeek = today.clone().add(1, "week").startOf("isoWeek");
    const endOfNextWeek = today.clone().add(1, "week").endOf("isoWeek");

    return {
      start: startOfNextWeek.format("DD/MM/YYYY"),
      end: endOfNextWeek.format("DD/MM/YYYY"),
    };
  };

  return (
    <Box>
      <IntroPageSection
        title={infoIntro.title?.toUpperCase()}
        des={infoIntro.description}
        backgroundImg={infoIntro.image}
      />

      <InfoQuillSection infoItems={infoItems} />

      <Box sx={{ px: 15, py: 8, backgroundColor: "#88dbdf" }}>
        <Typography
          sx={{
            fontFamily: "'Outfit Variable', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            fontSize: 50,
            color: "#221551",
            marginBottom: 5,
          }}
        >
          FIND CLASS SCHEDULE
        </Typography>

        <Box sx={{ display: "flex", gap: 5, marginBottom: 5 }}>
          <SelectItem
            value={gym}
            onChange={(event) => setGym(event.target.value)}
          >
            <MenuItemStyled value="not-select">Select Gym</MenuItemStyled>
            {listGyms.map((item, idx) => (
              <MenuItemStyled key={idx} value={item.id}>
                {item.name}
              </MenuItemStyled>
            ))}
          </SelectItem>

          <SelectItem
            value={program}
            onChange={(event) => setProgram(event.target.value)}
          >
            <MenuItemStyled value="not-select">Select Program</MenuItemStyled>
            {listPrograms.map((item, idx) => (
              <MenuItemStyled key={idx} value={item.id}>
                {item.name}
              </MenuItemStyled>
            ))}
          </SelectItem>

          <SelectItem
            value={week}
            onChange={(event) => setWeek(event.target.value)}
          >
            <MenuItemStyled value="not-select">Select Week</MenuItemStyled>
            <MenuItemStyled value="previous">
              {getPreviousWeek().start} - {getPreviousWeek().end}
            </MenuItemStyled>
            <MenuItemStyled value="current">
              {getCurrentWeek().start} - {getCurrentWeek().end}
            </MenuItemStyled>
            <MenuItemStyled value="next">
              {getNextWeek().start} - {getNextWeek().end}
            </MenuItemStyled>
          </SelectItem>
        </Box>

        {gym !== "not-select" &&
          program !== "not-select" &&
          week !== "not-select" && (
            <Paper sx={{ border: "1px solid #ccc" }}>
              <Scheduler data={classSchedules} firstDayOfWeek={1} height={700}>
                <ViewState
                  currentDate={dateViewState}
                  defaultCurrentViewName="Week"
                />
                <WeekView
                  startDayHour={7}
                  endDayHour={23}
                  timeTableCellComponent={TimeTableCell}
                  dayScaleCellComponent={DayScaleCell}
                />
                <Appointments />
                <AppointmentTooltip
                  showCloseButton
                  contentComponent={Content}
                />
              </Scheduler>
            </Paper>
          )}
      </Box>

      <FreeTrialContainer />
      <TopBlogsContainer />
    </Box>
  );
};

export default ClassSchedulePage;
