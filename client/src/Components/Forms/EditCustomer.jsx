import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../data/customerData";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const EditCustomer = () => {
  const [customer, setCustomer] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCustomerById(id).then(setCustomer);
  }, [id]);

  const handleUpdateCustomer = (customerId, customerObj, e) => {
    e.preventDefault();
    updateCustomer(customerId, customerObj).then(() => {
      navigate("/customers");
    });
  };

  return (
    <div className="container">
      <form>
        <h4 className="mt-4">Edit Customer</h4>
        <FormGroup className="mt-5">
          <Label for="editCustomerFirstName">First Name</Label>
          <Input
            type="text"
            id="editCustomerFirstName"
            required
            value={customer.firstName}
            onChange={(e) => {
              const data = { ...customer };
              data.firstName = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="editCustomerLastName">Last Name</Label>
          <Input
            type="text"
            id="editCustomerLastName"
            required
            value={customer.lastName}
            onChange={(e) => {
              const data = { ...customer };
              data.lastName = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="editCustomerPhone">Phone Number</Label>
          <Input
            type="text"
            id="editCustomerPhone"
            required
            value={customer.phoneNumber}
            onChange={(e) => {
              const data = { ...customer };
              data.phoneNumber = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="editCustomerEmail">Email</Label>
          <Input
            type="text"
            id="editCustomerEmail"
            required
            value={customer.email}
            onChange={(e) => {
              const data = { ...customer };
              data.email = e.target.value;
              setCustomer(data);
            }}
          />
        </FormGroup>
        <Button
          className="btn"
          type="submit"
          onClick={(e) => {
            handleUpdateCustomer(id, customer, e);
          }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
