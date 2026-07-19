import axios from "axios";
// import "../envConfig";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("no backend url");
}

export const api = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL,
});
