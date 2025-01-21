const _apiString = "/api/appointments";

export const getAppointments = () => {
  return fetch(_apiString).then((res) => res.json());
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
