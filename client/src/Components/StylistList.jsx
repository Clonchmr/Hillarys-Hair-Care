import { useEffect, useState } from "react";
import { getStylists } from "../data/stylistData";
import { Button, Table } from "reactstrap";

export const StylistList = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    getStylists().then(setStylists);
  }, []);
  return (
    <div className="container">
      <div className="sub-menu bg-warning mt-4 mb-2">
        <h4>Stylists</h4>
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
          {stylists.map((s) => (
            <tr key={`stylist-${s.id}`}>
              <td scope="row">{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.phoneNumber}</td>
              <td>{s.email}</td>
              <td>
                <Button>See Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
