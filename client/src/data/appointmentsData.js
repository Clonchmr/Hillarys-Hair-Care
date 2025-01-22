const _apiString = "/api/appointments";

export const getAppointments = () => {
  return fetch(_apiString).then((res) => res.json());
};

export const getAppointmentById = (id) => {
  return fetch(`${_apiString}/${id}`).then((res) => res.json());
};

export const addNewAppointment = (appointment) => {
  return fetch(_apiString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
};

export const cancelAppointment = (id) => {
  return fetch(`${_apiString}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateAppointment = (id, appointment) => {
  return fetch(`${_apiString}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
};
