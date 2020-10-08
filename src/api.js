import axios from "axios";

export const ERROR = "error";
export const getAdvisors = async (name, language, limit) => {
  const res = await axios.get(
    `/api/advisors?${name ? "name=" + name : ""}&${
      language ? "language=" + language : ""
    }&${limit ? "limit=" + limit : ""}`
  );

  if (res.status === 200) {
    return res.data;
  }
  return "error";
};

export const getLanguages = async () => {
  const res = await axios.get("/api/laguages");

  if (res.status === 200) {
    return res.data;
  }
  return ERROR;
};
