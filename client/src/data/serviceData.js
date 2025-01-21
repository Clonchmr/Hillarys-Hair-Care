const _apiString = "/api/services";

export const getServices = () => {
  return fetch(_apiString).then((res) => res.json());
};
