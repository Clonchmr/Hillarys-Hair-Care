import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppointmentList } from "./Components/AppointmentList.jsx";
import { NewAppointment } from "./Components/Forms/NewAppointment.jsx";
import { AppointmentDetails } from "./Components/AppointmentDetails.jsx";
import { StylistList } from "./Components/StylistList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
          <Route path="new" element={<NewAppointment />} />
          <Route path=":id" element={<AppointmentDetails />} />
        </Route>
        <Route path="stylists">
          <Route index element={<StylistList />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
