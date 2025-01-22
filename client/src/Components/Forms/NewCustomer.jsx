import { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { newCustomer } from "../../data/customerData";
import { useNavigate } from "react-router-dom";

export const NewCustomer = () => {
  const [customer, setCustomer] = useState({});

  const navigate = useNavigate();

  const handleAddCustomer = (e) => {
    e.preventDefault();
    newCustomer(customer).then(() => {
      navigate("/customers");
    });
  };

  return (
    <div className="container">
      <form>
        <FormGroup className="mt-5">
          <Label for="newCustomerFirstName">First Name</Label>
          <Input
            type="text"
            id="newCustomerFirstName"
            required
            placeholder="ex. John"
            onChange={(e) => {
              const data = { ...customer };
              data.firstName = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newCustomerLastName">Last Name</Label>
          <Input
            type="text"
            id="newCustomerLastName"
            required
            placeholder="ex. Doe"
            onChange={(e) => {
              const data = { ...customer };
              data.lastName = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newCustomerPhone">Phone Number</Label>
          <Input
            type="text"
            id="newCustomerPhone"
            required
            placeholder="ex. 555-555-5555"
            onChange={(e) => {
              const data = { ...customer };
              data.phoneNumber = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newCustomerEmail">Email</Label>
          <Input
            type="text"
            id="newCustomerEmail"
            required
            placeholder="ex. thisExample@example.exa"
            onChange={(e) => {
              const data = { ...customer };
              data.email = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <Button className="btn" type="submit" onClick={handleAddCustomer}>
          Submit
        </Button>
      </form>
    </div>
  );
};
