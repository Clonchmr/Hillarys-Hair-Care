const _apiString = "api/appointments";

export const getAppointments = () => {
  return fetch(_apiString).then((res) => res.json());
};
