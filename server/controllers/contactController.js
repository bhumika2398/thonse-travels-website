import Contact from "../models/Contact.js";
import { isDbConnected } from "../config/db.js";
import { appendJSONRecord, readJSONFile } from "../utils/jsonStore.js";

const FILE = "contact.json";

export async function createContact(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required.",
      });
    }

    const record = {
      name,
      email: email || "",
      phone: phone || "",
      subject: subject || "General Enquiry",
      message,
    };

    if (isDbConnected()) {
      const contact = await Contact.create(record);
      return res.status(201).json({
        message: "Thank you for reaching out! We'll get back to you shortly.",
        contact,
      });
    }

    const saved = appendJSONRecord(FILE, {
      id: Date.now().toString(),
      ...record,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Thank you for reaching out! We'll get back to you shortly.",
      contact: saved,
    });
  } catch (err) {
    console.error("[contactController] createContact error:", err.message);
    res.status(500).json({ message: "Failed to submit message", error: err.message });
  }
}

export async function getContacts(req, res) {
  try {
    if (isDbConnected()) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.json(contacts);
    }
    const contacts = readJSONFile(FILE, []);
    return res.json([...contacts].reverse());
  } catch (err) {
    console.error("[contactController] getContacts error:", err.message);
    res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
  }
}
