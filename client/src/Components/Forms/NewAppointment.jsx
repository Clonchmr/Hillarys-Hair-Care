import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { getServices } from "../../data/serviceData";
import { convertTimeTo12, getCostAsDollars } from "../../exports";
import { getCustomers } from "../../data/customerData";
import { getStylists } from "../../data/stylistData";
import { addNewAppointment } from "../../data/appointmentsData";

export const NewAppointment = () => {
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [openHours, setOpenHours] = useState([
    { id: 1, time: "08:00:00" },
    { id: 2, time: "09:00:00" },
    { id: 3, time: "10:00:00" },
    { id: 4, time: "11:00:00" },
    { id: 5, time: "12:00:00" },
    { id: 6, time: "13:00:00" },
    { id: 7, time: "14:00:00" },
    { id: 8, time: "15:00:00" },
    { id: 9, time: "16:00:00" },
    { id: 10, time: "17:00:00" },
  ]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getServices().then(setServices);
    getCustomers().then(setCustomers);
    getStylists().then(setStylists);
  }, []);

  useEffect(() => {
    const totalCost = selectedServices.reduce((sum, selectedService) => {
      const service = services.find((s) => s.id === selectedService.id);
      return sum + (service ? service.price : 0);
    }, 0);
    setTotalCost(totalCost.toFixed(2));
  }, [selectedServices, services]);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const totalDate = `${appointmentInfo.date}T${appointmentInfo.time}`;

    const appointment = {
      startTime: totalDate,
      stylistId: appointmentInfo.stylistId,
      customerId: appointmentInfo.customerId,
      services: selectedServices,
    };

    addNewAppointment(appointment);
  };

  return (
    <div className="container mt-5">
      <h3>Add New Appointment</h3>
      <form className="mt-5">
        <FormGroup>
          <Label for="customerSelect">Customer</Label>
          <Input
            id="customerSelect"
            type="select"
            required
            onChange={(e) => {
              const data = { ...appointmentInfo };
              data.customerId = parseInt(e.target.value);
              setAppointmentInfo(data);
            }}
          >
            <option value="">Choose Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="stylistSelect">Stylist</Label>
          <Input
            id="stylistSelect"
            type="select"
            required
            onChange={(e) => {
              const data = { ...appointmentInfo };
              data.stylistId = parseInt(e.target.value);
              setAppointmentInfo(data);
            }}
          >
            <option value="">Select Stylist</option>
            {stylists.map((s) =>
              s.isActive ? (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ) : (
                ""
              )
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="appointmentDate">Date</Label>
          <Input
            id="appointmentDate"
            type="date"
            required
            onChange={(e) => {
              const data = { ...appointmentInfo };
              data.date = e.target.value;
              setAppointmentInfo(data);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="timeSelect">Time</Label>
          <Input
            id="timeSelect"
            type="select"
            required
            onChange={(e) => {
              const data = { ...appointmentInfo };
              data.time = e.target.value;
              setAppointmentInfo(data);
            }}
          >
            <option value="">Choose Time</option>
            {openHours.map((h) => (
              <option key={h.id} value={h.time}>
                {convertTimeTo12(h.time)}
              </option>
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
                id={`service-${s.id}`}
                className="mt-1"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedServices([...selectedServices, { id: s.id }]);
                  } else {
                    setSelectedServices(
                      selectedServices.filter((service) => service.id !== s.id)
                    );
                  }
                }}
              />
              <Label for={`service-${s.id}`}>
                {s.name} {getCostAsDollars(s.price)}
              </Label>
            </FormGroup>
          ))}
        </div>
        <h5 className="mt-3">Total Cost: {totalCost}</h5>
        <Button
          type="submit"
          className="btn mt-4"
          onClick={handleAddAppointment}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
