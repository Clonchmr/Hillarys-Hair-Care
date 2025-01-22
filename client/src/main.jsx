import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppointmentList } from "./Components/AppointmentList.jsx";
import { NewAppointment } from "./Components/Forms/NewAppointment.jsx";
import { AppointmentDetails } from "./Components/AppointmentDetails.jsx";
import { StylistList } from "./Components/StylistList.jsx";
import { NewStylist } from "./Components/Forms/NewStylist.jsx";
import { StylistDetails } from "./Components/StylistDetails.jsx";
import { EditStylist } from "./Components/Forms/EditStylist.jsx";
import { CustomerList } from "./Components/CustomerList.jsx";
import { CustomerDetails } from "./Components/CustomerDetails.jsx";

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
          <Route path="new" element={<NewStylist />} />
          <Route path=":id" element={<StylistDetails />} />
          <Route path="edit/:id" element={<EditStylist />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":id" element={<CustomerDetails />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
