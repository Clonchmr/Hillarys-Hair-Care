const _apiString = "/api/customers";

export const getCustomers = () => {
  return fetch(_apiString).then((res) => res.json());
};
