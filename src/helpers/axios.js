import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGI3Yzg0NDBiNmYyZTRhYjJjN2NjNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDU0NTY4NywiZXhwIjoxNjQ0NjMyMDg3fQ.aB6nWhTPPSbCAvSV-n24cbY6WJYrF-UccXpqIsTLKzc";

export const clienteAxiosPublic = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const clienteAxiosAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { token: `Bearer ${token}` },
});
