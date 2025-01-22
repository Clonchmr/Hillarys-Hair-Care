import { useEffect, useState } from "react";
import { getCustomers } from "../data/customerData";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);
  return (
    <div className="container">
      <div className="sub-menu bg-warning mt-4 mb-2">
        <h4>Customers</h4>
        <Button className="btn mb-2" color="dark" outline>
          Add New
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={`customer-${c.id}`}>
              <td scope="row">{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.phoneNumber}</td>
              <td>{c.email}</td>
              <td>
                <Button
                  className="btn"
                  onClick={() => {
                    navigate(`/customers/${c.id}`);
                  }}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
