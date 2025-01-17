import { useEffect, useState } from "react";
import { getAppointments } from "../data/appointmentsData";
import { Table } from "reactstrap";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then(setAppointments);
  }, []);

  const convertTimeTo12 = (time24) => {
    let [hours, minutes] = time24.split(":").map(Number);

    const amOrPM = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${String(minutes).padStart(2, "0")} ${amOrPM}`;
  };

  const getCostAsDollars = (cost) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cost);
    return formattedNumber;
  };
  return (
    <div className="container">
      <div className="sub-menu bg-warning mt-4 mb-2">
        <h4>Appointments</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Stylist</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Services</th>
            <th>Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={`appointments-${a.id}`}>
              <td scope="row">
                {a.stylist.firstName} {a.stylist.lastName}
              </td>
              <td>
                {a.customer.firstName} {a.customer.lastName}
              </td>
              <td>{a.startTime.split("T")[0]}</td>
              <td>
                {convertTimeTo12(a.startTime.split("T")[1].split("Z")[0])}
              </td>
              <td>
                {a.services.map(
                  (s, i) => `${s.name}${i < a.services.length - 1 ? "," : ""} `
                )}
              </td>
              <td>{getCostAsDollars(a.totalCost)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
