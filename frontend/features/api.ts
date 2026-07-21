import axios from "axios";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const NEXT_PUBLIC_LOCAL_BACKEND_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;
const NEXT_PUBLIC_ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

if (!NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("no backend url");
}

export const api = axios.create({
  baseURL:
    NEXT_PUBLIC_ENVIRONMENT === "production"
      ? NEXT_PUBLIC_BACKEND_URL
      : NEXT_PUBLIC_LOCAL_BACKEND_URL,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
  },
});
