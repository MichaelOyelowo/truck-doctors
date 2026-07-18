import manTruck from "../assets/homepage-images/man/man11.avif";
import rhinoTruck from "../assets/homepage-images/rhino/rhino1.avif";
import daewooTruck from "../assets/homepage-images/daewoo/daewoo1.avif";
import kiaTruck from "../assets/homepage-images/kia/kia1.avif";
import kiaCar1 from "../assets/homepage-images/kia/kia_car1.avif";
import kiaCar2 from "../assets/homepage-images/kia/kia_car2.avif";
import kiaCar3 from "../assets/homepage-images/kia/kia_car3.avif";
import kiaCar4 from "../assets/homepage-images/kia/kia_car4.avif";
import kiaCar5 from "../assets/homepage-images/kia/kia_car5.avif";
import kiaCar6 from "../assets/homepage-images/kia/kia_car6.avif";
import hyundai1 from "../assets/homepage-images/hyundai/hyundai1.avif";
import hyundai2 from "../assets/homepage-images/hyundai/hyundai2.avif";
import hyundai3 from "../assets/homepage-images/hyundai/hyundai3.avif";
import hyundai4 from "../assets/homepage-images/hyundai/hyundai4.avif";
import hyundai5 from "../assets/homepage-images/hyundai/hyundai5.avif";
import hyundai6 from "../assets/homepage-images/hyundai/hyundai6.avif";
import byd1 from "../assets/homepage-images/byd/byd1.avif";
import byd2 from "../assets/homepage-images/byd/byd2.avif";
import byd3 from "../assets/homepage-images/byd/byd3.avif";
import byd4 from "../assets/homepage-images/byd/byd4.avif";
import byd5 from "../assets/homepage-images/byd/byd5.avif";
import byd6 from "../assets/homepage-images/byd/byd6.avif";

export const VEHICLE_TYPES = ["Trucks", "Cars"];

export const FILTERS_BY_TYPE = {
  Trucks: ["All Trucks", "New Trucks", "Used Trucks", "Heavy Duty", "Medium Duty", "Reefers", "Tractor Units"],
  Cars: ["All Cars", "New Cars", "Used Cars", "Kia", "Hyundai", "BYD"],
};

export const INVENTORY = [
  { id: "truck-1", type: "Trucks", category: "Heavy Duty", condition: "Used", name: "Hyundai Xcient 6x4", year: "2019", price: "$42,000", image: manTruck, power: "520 HP", load: "40T", fuel: "Diesel", mileage: "142,000 km", transmission: "Manual" },
  { id: "truck-2", type: "Trucks", category: "Tractor Units", condition: "New", name: "MAN TGX 18.440", year: "2024", price: "$78,500", image: rhinoTruck, power: "440 HP", load: "32T", fuel: "Diesel", mileage: "0 km", transmission: "Automatic" },
  { id: "truck-3", type: "Trucks", category: "Reefers", condition: "Used", name: "Daewoo Novus Reefer", year: "2020", price: "$36,750", image: daewooTruck, power: "380 HP", load: "18T", fuel: "Diesel", mileage: "110,000 km", transmission: "Manual" },
  { id: "truck-4", type: "Trucks", category: "Medium Duty", condition: "Certified", name: "Kia Bongo III", year: "2021", price: "$24,900", image: kiaTruck, power: "130 HP", load: "3.5T", fuel: "Diesel", mileage: "58,000 km", transmission: "Manual" },
  { id: "car-1", type: "Cars", category: "Kia", condition: "Used", name: "Kia Sportage", year: "2021", price: "$24,900", image: kiaCar1, fuel: "Petrol", mileage: "42,000 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-2", type: "Cars", category: "Kia", condition: "Used", name: "Kia Sorento", year: "2020", price: "$27,500", image: kiaCar2, fuel: "Diesel", mileage: "63,000 km", transmission: "Automatic", seats: "7 seats" },
  { id: "car-3", type: "Cars", category: "Kia", condition: "New", name: "Kia Seltos", year: "2024", price: "$29,800", image: kiaCar3, fuel: "Petrol", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-4", type: "Cars", category: "Kia", condition: "Used", name: "Kia K5", year: "2021", price: "$22,400", image: kiaCar4, fuel: "Petrol", mileage: "51,000 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-5", type: "Cars", category: "Kia", condition: "New", name: "Kia Carnival", year: "2024", price: "$34,600", image: kiaCar5, fuel: "Diesel", mileage: "0 km", transmission: "Automatic", seats: "8 seats" },
  { id: "car-6", type: "Cars", category: "Kia", condition: "Used", name: "Kia Picanto", year: "2022", price: "$14,200", image: kiaCar6, fuel: "Petrol", mileage: "35,000 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-7", type: "Cars", category: "Hyundai", condition: "New", name: "Hyundai Tucson", year: "2025", price: "$29,000", image: hyundai1, fuel: "Petrol", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-8", type: "Cars", category: "Hyundai", condition: "Used", name: "Hyundai Elantra", year: "2022", price: "$18,900", image: hyundai2, fuel: "Petrol", mileage: "39,000 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-9", type: "Cars", category: "Hyundai", condition: "Used", name: "Hyundai Santa Fe", year: "2021", price: "$26,800", image: hyundai3, fuel: "Diesel", mileage: "57,000 km", transmission: "Automatic", seats: "7 seats" },
  { id: "car-10", type: "Cars", category: "Hyundai", condition: "New", name: "Hyundai Kona", year: "2024", price: "$25,400", image: hyundai4, fuel: "Petrol", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-11", type: "Cars", category: "Hyundai", condition: "Used", name: "Hyundai Palisade", year: "2021", price: "$35,500", image: hyundai5, fuel: "Petrol", mileage: "68,000 km", transmission: "Automatic", seats: "7 seats" },
  { id: "car-12", type: "Cars", category: "Hyundai", condition: "New", name: "Hyundai Venue", year: "2024", price: "$20,600", image: hyundai6, fuel: "Petrol", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-13", type: "Cars", category: "BYD", condition: "New", name: "BYD Atto 3", year: "2024", price: "$31,500", image: byd1, fuel: "Electric", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-14", type: "Cars", category: "BYD", condition: "New", name: "BYD Seal", year: "2024", price: "$38,900", image: byd2, fuel: "Electric", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-15", type: "Cars", category: "BYD", condition: "New", name: "BYD Dolphin", year: "2024", price: "$25,800", image: byd3, fuel: "Electric", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-16", type: "Cars", category: "BYD", condition: "New", name: "BYD Song Plus", year: "2024", price: "$36,200", image: byd4, fuel: "Hybrid", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-17", type: "Cars", category: "BYD", condition: "New", name: "BYD Han", year: "2024", price: "$43,500", image: byd5, fuel: "Electric", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
  { id: "car-18", type: "Cars", category: "BYD", condition: "New", name: "BYD Yuan Plus", year: "2024", price: "$29,700", image: byd6, fuel: "Electric", mileage: "0 km", transmission: "Automatic", seats: "5 seats" },
];
