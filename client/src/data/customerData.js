const _apiString = "/api/customers";

export const getCustomers = () => {
  return fetch(_apiString).then((res) => res.json());
};

export const getCustomerById = (id) => {
  return fetch(`${_apiString}/${id}`).then((res) => res.json());
};
