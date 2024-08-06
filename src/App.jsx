import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Rootpage from "./pages/Rootpage";
import ListTransPage from "./pages/ListTransPage";
import "@fontsource-variable/outfit";
import TransDetailPage from "./pages/TransDetailPage";
import GymPage from "./pages/GymPage";
import FreeTrialPage from "./pages/FreeTrialPage";
import GymDetailPage from "./pages/GymDetailPage";
import CoachPage from "./pages/CoachPage";
import CoachDetailPage from "./pages/CoachDetailPage";
import ServicePage from "./pages/ServicePage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import ClassSchedulePage from "./pages/ClassSchedulePage";
import ExercisePage from "./pages/ExercisePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Rootpage />}>
            <Route path="" element={<Homepage />} />
            <Route
              path="transformation"
              element={<ListTransPage />}
            />
            <Route
              path="transformation-detail/:id"
              element={<TransDetailPage />}
            />
            <Route path="gym" element={<GymPage />} />
            <Route path="gym-detail/:id" element={<GymDetailPage />} />
            <Route path="coach" element={<CoachPage />} />
            <Route path="coach-detail/:id" element={<CoachDetailPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="service/checkout" element={<CheckoutPage />} />
            <Route path="class" element={<ClassSchedulePage />} />
            <Route path="exercise" element={<ExercisePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/detail/:id" element={<BlogDetailPage />} />
            <Route path="free-trial" element={<FreeTrialPage />} />
            <Route path="success/:type" element={<SuccessPage />} />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
