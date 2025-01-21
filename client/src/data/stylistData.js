const _apiString = "/api/stylists";

export const getStylists = () => {
  return fetch(_apiString).then((res) => res.json());
};
