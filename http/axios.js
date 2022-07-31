import axios from "axios";

const api = axios.create({
  baseURL: "https://ipapi.co/json/",
});

export const getCountryCode = async () =>
  await api.get("https://ipapi.co/json/");
