import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "../data/customerData";
import { Button, Card, CardBody, CardText, Table } from "reactstrap";
import { convertTimeTo12, getCostAsDollars } from "../exports";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCustomerById(id).then(setCustomer);
  }, [id]);
  return (
    <div className="container">
      <Card className="mt-5">
        <CardBody>
          <div className="d-flex justify-content-around">
            <div>
              <CardText>{`First Name: ${customer.firstName}`}</CardText>
              <CardText>{`Last Name: ${customer.lastName}`}</CardText>
              <Button
                className="btn"
                onClick={() => {
                  navigate(`/customers/${id}/edit`);
                }}
              >
                Edit
              </Button>
            </div>
            <div>
              <CardText>{`Phone Number: ${customer.phoneNumber}`}</CardText>
              <CardText>{`Email: ${customer.email}`}</CardText>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="sub-menu bg-warning mt-4">
        <h4>{`${customer.firstName} ${customer.lastName} Appointments`}</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Stylist</th>
            <th>Date</th>
            <th>Time</th>
            <th>Services</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {customer.appointments?.map((a) => (
            <tr key={a.id}>
              <td scope="row">
                {a.stylist.firstName} {a.stylist.lastName}
              </td>
              <td>{a.startTime?.split("T")[0]}</td>
              <td>{convertTimeTo12(a.startTime?.split("T")[1])}</td>
              <td>
                {a.services?.map(
                  (s, i) => `${s.name}${i < a.services.length - 1 ? ", " : ""}`
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
