import { MapPin, ClipboardList, Headset } from "lucide-react";

export const navLinks = [
  { label: "Vehicles", path: "/vehicles" },
  { label: "Shipping to Ghana", path: "/ghana", hot: true },
  { label: "Global Logistics", path: "/logistics" },
  { label: "Tracking", path: "/track" },
  { label: "Services", path: "/services" },
];

export const truckTypes = ["Semi-trucks", "Ghana Haulers", "Flatbeds", "Reefers", "Box Trucks"];

export const mobileTools = [
  { label: "Track", icon: MapPin, path: "/track" },
  { label: "Quote", icon: ClipboardList, path: "/quote" },
  { label: "Support", icon: Headset, path: "/support" }
];

export const popularSearches = [
  "Semi-trucks to Ghana",
  "Flatbed shipping",
  "Container freight",
  "Busan to Tema",
  "Reefer trucks",
  "Track my order",
];

export const featuredRoutes = [
  { from: "Busan, South Korea", to: "Tema Port, Ghana", time: "18-22 days" },
  { from: "Incheon, South Korea", to: "Accra, Ghana", time: "20-25 days" },
];