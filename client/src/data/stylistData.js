const _apiString = "/api/stylists";

export const getStylists = () => {
  return fetch(_apiString).then((res) => res.json());
};

export const getStylistById = (id) => {
  return fetch(`${_apiString}/${id}`).then((res) => res.json());
};

export const addNewStylist = (stylistObj) => {
  return fetch(_apiString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stylistObj),
  });
};
