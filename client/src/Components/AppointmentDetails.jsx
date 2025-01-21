import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  cancelAppointment,
  getAppointmentById,
} from "../data/appointmentsData";
import { convertTimeTo12, getCostAsDollars } from "../exports";

export const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAppointmentById(id).then(setAppointment);
  }, [id]);

  const handleCancelAppointment = (appointmentId) => {
    cancelAppointment(appointmentId).then(navigate("/appointments"));
  };
  return (
    <div className="container">
      <Card className="my-2">
        <CardHeader>Appointment# {id}</CardHeader>
        <CardBody>
          <div className="d-flex justify-content-around">
            <div>
              <CardText>
                Stylist: {appointment.stylist?.firstName}{" "}
                {appointment.stylist?.lastName}
              </CardText>
              <CardText>
                Customer: {appointment.customer?.firstName}{" "}
                {appointment.customer?.lastName}
              </CardText>
            </div>
            <div>
              <CardText>
                Date: {appointment.startTime?.split("T")[0] || "N/A"}
              </CardText>
              <CardText>
                Start Time:{" "}
                {appointment.startTime
                  ? convertTimeTo12(appointment.startTime?.split("T")[1])
                  : "N/A"}
              </CardText>
              <CardText>
                End Time:{" "}
                {appointment.endTime
                  ? convertTimeTo12(appointment.endTime?.split("T")[1])
                  : "N/A"}
              </CardText>
            </div>
          </div>
          <ListGroup flush className="mt-3 mb-3">
            <ListGroupItem>Services:</ListGroupItem>
            {appointment.services?.map((s) => (
              <ListGroupItem key={s.id}>{s.name}</ListGroupItem>
            ))}
          </ListGroup>
          <CardText>
            Total Cost: {getCostAsDollars(appointment.totalCost) || "$0.00"}
          </CardText>
          <Button
            className="btn"
            onClick={() => {
              handleCancelAppointment(id);
            }}
          >
            Cancel Appointment
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
