import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getAppointmentById } from "../data/appointmentsData";
import { convertTimeTo12, getCostAsDollars } from "../exports";

export const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getAppointmentById(id).then(setAppointment);
  }, [id]);
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
        </CardBody>
      </Card>
    </div>
  );
};
