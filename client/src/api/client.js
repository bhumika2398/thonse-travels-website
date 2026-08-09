import axios from "axios";

// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In prod, set VITE_API_URL to the deployed API's base URL.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL });

export const fetchFleet = () => api.get("/fleet").then((res) => res.data);

export const createBooking = (payload) => api.post("/bookings", payload).then((res) => res.data);

export const createContact = (payload) => api.post("/contact", payload).then((res) => res.data);

export const askChatbot = (message) =>
  api.post("/chatbot", { message }).then((res) => res.data);

export default api;
