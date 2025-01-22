const _apiString = "/api/customers";

export const getCustomers = () => {
  return fetch(_apiString).then((res) => res.json());
};

export const getCustomerById = (id) => {
  return fetch(`${_apiString}/${id}`).then((res) => res.json());
};

export const updateCustomer = (id, customerObj) => {
  return fetch(`${_apiString}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerObj),
  });
};

export const newCustomer = (customerObj) => {
  return fetch(_apiString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerObj),
  });
};
