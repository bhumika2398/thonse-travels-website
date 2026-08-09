import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    vehicle: { type: String, required: true },
    pickupLocation: { type: String },
    destination: { type: String },
    date: { type: String, required: true },
    passengers: { type: String },
    notes: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
