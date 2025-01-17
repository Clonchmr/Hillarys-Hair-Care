import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppointmentList } from "./Components/AppointmentList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
