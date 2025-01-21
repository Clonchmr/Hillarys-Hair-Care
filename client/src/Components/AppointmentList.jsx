import { useEffect, useState } from "react";
import { getAppointments } from "../data/appointmentsData";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { convertTimeTo12, getCostAsDollars } from "../exports";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAppointments().then(setAppointments);
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-warning mt-4 mb-2">
        <h4>Appointments</h4>
        <Button
          className="mb-2"
          color="dark"
          outline
          onClick={() => {
            navigate("/appointments/new");
          }}
        >
          Add New
        </Button>
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
