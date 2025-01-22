import { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { addNewStylist } from "../../data/stylistData";
import { useNavigate } from "react-router-dom";

export const NewStylist = () => {
  const [newStylist, setNewStylist] = useState({});

  const navigate = useNavigate();

  const handleAddStylist = (e) => {
    e.preventDefault();
    addNewStylist(newStylist).then(() => {
      navigate("/stylists");
    });
  };

  return (
    <div className="container">
      <h3 className="mt-5">Add New Stylist</h3>
      <form className="mt-5">
        <FormGroup>
          <Label for="newStylistName_first">First Name</Label>
          <Input
            type="text"
            id="newStylistName_first"
            required
            placeholder="ex. Jane"
            onChange={(e) => {
              const data = { ...newStylist };
              data.firstName = e.target.value;
              setNewStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newStylistName_last">Last Name</Label>
          <Input
            type="text"
            id="newStylistName_last"
            required
            placeholder="ex. Doe"
            onChange={(e) => {
              const data = { ...newStylist };
              data.lastName = e.target.value;
              setNewStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stylistPhoneNumber">Phone Number</Label>
          <Input
            type="text"
            id="stylistPhoneNumber"
            required
            placeholder="ex. 555-555-5555"
            onChange={(e) => {
              const data = { ...newStylist };
              data.phoneNumber = e.target.value;
              setNewStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stylistEmail">Email</Label>
          <Input
            type="text"
            id="stylistEmail"
            required
            placeholder="ex. exampleM@ex.com"
            onChange={(e) => {
              const data = { ...newStylist };
              data.email = e.target.value;
              setNewStylist(data);
            }}
          />
        </FormGroup>
        <Button className="btn" type="submit" onClick={handleAddStylist}>
          Submit
        </Button>
      </form>
    </div>
  );
};
