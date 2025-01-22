export const getCostAsDollars = (cost) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cost);
  return formattedNumber;
};

export const convertTimeTo12 = (time24) => {
  let [hours, minutes] = time24.split(":").map(Number);

  const amOrPM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${String(minutes).padStart(2, "0")} ${amOrPM}`;
};
