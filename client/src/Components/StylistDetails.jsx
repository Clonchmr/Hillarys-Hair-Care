import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText, Table } from "reactstrap";
import { deactivateStylist, getStylistById } from "../data/stylistData";
import { convertTimeTo12, getCostAsDollars } from "../exports";

export const StylistDetails = () => {
  const [stylist, setStylist] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getStylistById(id).then(setStylist);
  }, [id]);

  const handleDeactivate = (stylistId) => {
    deactivateStylist(stylistId).then(() => {
      navigate("/stylists");
    });
  };
  return (
    <div className="container">
      <Card className="mt-5">
        <CardBody>
          <div className="d-flex justify-content-around">
            <div>
              <CardText>{`First Name: ${stylist.firstName}`}</CardText>
              <CardText>{`Last Name: ${stylist.lastName}`}</CardText>
              <Button
                className="mt-4"
                onClick={() => {
                  navigate(`/stylists/edit/${id}`);
                }}
              >
                Edit
              </Button>
            </div>
            <div>
              <CardText>{`Last Name: ${stylist.lastName}`}</CardText>
              <CardText>{`Email: ${stylist.email}`}</CardText>
              <Button
                className="mt-4"
                onClick={() => {
                  handleDeactivate(id);
                }}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="sub-menu bg-warning mt-4 mb-2">
        <h4>{`${stylist.firstName} ${stylist.lastName} appointments`}</h4>
      </div>
      <Table className="mt-3">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Services</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {stylist.appointments?.map((a) => (
            <tr key={a.id}>
              <td scope="row">
                {a.customer.firstName} {a.customer.lastName}
              </td>
              <td>{a.startTime?.split("T")[0]}</td>
              <td>{convertTimeTo12(a.startTime)}</td>
              <td>
                {a.services?.map((s, i) => {
                  return `${s.name}${i < a.services.length - 1 ? "," : ""} `;
                })}
              </td>
              <td>{getCostAsDollars(a.totalCost)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
