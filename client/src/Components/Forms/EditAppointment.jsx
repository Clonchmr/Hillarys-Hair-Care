import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import {
  getAppointmentById,
  updateAppointment,
} from "../../data/appointmentsData";
import { getCostAsDollars } from "../../exports";
import { getServices } from "../../data/serviceData";
import { getCustomers } from "../../data/customerData";
import { getStylists } from "../../data/stylistData";

export const EditAppointment = () => {
  const [appointmentToEdit, setAppointmentToEdit] = useState({
    customerId: "",
  });
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stylists, setStylists] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getServices().then(setServices);
    getCustomers().then(setCustomers);
    getStylists().then(setStylists);
  }, []);

  useEffect(() => {
    getAppointmentById(id).then(setAppointmentToEdit);
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedAppointment = {
      stylistId: parseInt(appointmentToEdit.stylistId),
      customerId: parseInt(appointmentToEdit.customerId),
      services: appointmentToEdit.services?.map((s) => ({ id: s.id })),
    };

    updateAppointment(id, updatedAppointment).then(() => {
      navigate("/appointments");
    });
  };

  return (
    <div className="container mt-5">
      <h3>Edit Appointment</h3>
      <form>
        <FormGroup>
          <Label for="editAppointmentCustomer">Customer</Label>
          <Input
            type="select"
            id="editAppointmentCustomer"
            required
            value={appointmentToEdit.customerId}
            onChange={(e) => {
              const data = { ...appointmentToEdit };
              data.customerId = e.target.value;
              setAppointmentToEdit(data);
            }}
          >
            {customers.map((c) => (
              <option
                key={`customer-${c.id}`}
                value={c.id}
              >{`${c.firstName} ${c.lastName}`}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="editAppointmentStylist">Stylist</Label>
          <Input
            type="select"
            id="editAppointmentStylist"
            required
            value={appointmentToEdit.stylistId}
            onChange={(e) => {
              const data = { ...appointmentToEdit };
              data.stylistId = e.target.value;
              setAppointmentToEdit(data);
            }}
          >
            {stylists.map((s) => (
              <option
                key={`stylist-${s.id}`}
                value={s.id}
              >{`${s.firstName} ${s.lastName}`}</option>
            ))}
          </Input>
        </FormGroup>
        <h6 className="mt-4">Choose Services</h6>
        <div className="d-flex flex-row justify-content-center gap-3 mt-4">
          {services.map((s) => (
            <FormGroup check inline key={s.id} className="d-flex gap-1">
              <Input
                type="checkbox"
                value={s.id}
                className="mt-1"
                checked={appointmentToEdit.services?.some(
                  (appointmentService) => appointmentService.id === s.id
                )}
                onChange={(e) => {
                  const updatedServices = e.target.checked
                    ? [...appointmentToEdit.services, s]
                    : appointmentToEdit.services.filter(
                        (service) => service.id !== s.id
                      );
                  setAppointmentToEdit({
                    ...appointmentToEdit,
                    services: updatedServices,
                  });
                }}
              />
              <Label for={`service-${s.id}`}>
                {s.name} {getCostAsDollars(s.price)}
              </Label>
            </FormGroup>
          ))}
        </div>
        <Button className="btn" type="submit" onClick={handleUpdate}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};
