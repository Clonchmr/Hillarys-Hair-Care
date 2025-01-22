import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStylistById, updateStylist } from "../../data/stylistData";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const EditStylist = () => {
  const [stylist, setStylist] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getStylistById(id).then(setStylist);
  }, [id]);

  const handleUpdateStylist = (id, stylistObj, e) => {
    e.preventDefault();
    updateStylist(id, stylistObj).then(() => {
      navigate("/stylists");
    });
  };
  return (
    <div className="container">
      <form>
        <h4 className="mt-4">Edit Stylist</h4>
        <FormGroup className="mt-5">
          <Label for="stylistFirstNameEdit">First Name</Label>
          <Input
            type="text"
            id="stylistFirstNameEdit"
            required
            value={stylist.firstName}
            onChange={(e) => {
              const data = { ...stylist };
              data.firstName = e.target.value;
              setStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stylistLastNameEdit">Last Name</Label>
          <Input
            type="text"
            id="stylistLastNameEdit"
            required
            value={stylist.lastName}
            onChange={(e) => {
              const data = { ...stylist };
              data.lastName = e.target.value;
              setStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stylistPhoneEdit">Phone Number</Label>
          <Input
            type="text"
            id="stylistPhoneEdit"
            required
            value={stylist.phoneNumber}
            onChange={(e) => {
              const data = { ...stylist };
              data.phoneNumber = e.target.value;
              setStylist(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stylistEmailEdit">Email</Label>
          <Input
            type="text"
            id="stylistEmailEdit"
            required
            value={stylist.email}
            onChange={(e) => {
              const data = { ...stylist };
              data.email = e.target.value;
              setStylist(data);
            }}
          />
        </FormGroup>
        <Button
          className="btn"
          type="submit"
          onClick={(e) => {
            handleUpdateStylist(id, stylist, e);
          }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
