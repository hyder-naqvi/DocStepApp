export type AppointmentStatus = "upcoming" | "completed" | "cancelled";
export type ConsultationType = "video" | "in-person";

export interface Appointment {
  id: string;
  doctorImage: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: string;
  type: ConsultationType;
  status: AppointmentStatus;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  availableToday: boolean;
  nextAvailable: string;
  experience: string;
  languages: string[];
  price: number;
  hospital: string;
  city: string;
  about: string;
  education: string[];
}

export interface MedicalSpecialty {
  name: string;
  color: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface HealthStats {
  weight: string;
  height: string;
  bmi: string;
  bloodType: string;
  heartRate: string;
  bloodPressure: string;
}

const doctorImg = (seed: string) => `https://i.pravatar.cc/300?u=${seed}`;

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ayesha Khan",
    specialty: "Cardiology",
    image: doctorImg("1559839734-2b71ea197ec2"),
    rating: 4.9,
    reviews: 214,
    availableToday: true,
    nextAvailable: "Tomorrow, 10:00 AM",
    experience: "12 years",
    languages: ["English", "Urdu"],
    price: 3500,
    hospital: "Aga Khan University Hospital",
    city: "Karachi",
    about:
      "Board-certified cardiologist focused on preventive care and heart disease management.",
    education: ["MBBS — Dow Medical College", "FCPS Cardiology — CPSP"],
  },
  {
    id: "2",
    name: "Dr. Bilal Siddiqui",
    specialty: "Pediatrics",
    image: doctorImg("1612349316228-5942a9b914c2"),
    rating: 4.8,
    reviews: 189,
    availableToday: false,
    nextAvailable: "Mon, 2:30 PM",
    experience: "9 years",
    languages: ["English", "Urdu"],
    price: 2800,
    hospital: "Shaukat Khanum Memorial",
    city: "Lahore",
    about: "Pediatrician with a focus on growth, nutrition, and childhood vaccinations.",
    education: ["MBBS — KEMU", "MCPS Pediatrics — CPSP"],
  },
  {
    id: "3",
    name: "Dr. Fatima Malik",
    specialty: "Dermatology",
    image: doctorImg("1594824476967-48c8b964273f"),
    rating: 4.7,
    reviews: 156,
    availableToday: true,
    nextAvailable: "Today, 4:00 PM",
    experience: "8 years",
    languages: ["English", "Urdu", "Punjabi"],
    price: 3200,
    hospital: "South City Hospital",
    city: "Karachi",
    about: "Dermatologist treating acne, eczema, and cosmetic skin concerns.",
    education: ["MBBS — FMH", "FCPS Dermatology — CPSP"],
  },
  {
    id: "4",
    name: "Dr. Hassan Raza",
    specialty: "Orthopedics",
    image: doctorImg("1582750433449-648ed127bb54"),
    rating: 4.8,
    reviews: 142,
    availableToday: true,
    nextAvailable: "Today, 5:30 PM",
    experience: "15 years",
    languages: ["English", "Urdu"],
    price: 4000,
    hospital: "Shifa International",
    city: "Islamabad",
    about: "Orthopedic surgeon specializing in sports injuries and joint care.",
    education: ["MBBS — AKU", "FCPS Orthopedics — CPSP"],
  },
  {
    id: "5",
    name: "Dr. Sana Ahmed",
    specialty: "Neurology",
    image: doctorImg("1551601651-2a8555f1a136"),
    rating: 4.9,
    reviews: 98,
    availableToday: false,
    nextAvailable: "Wed, 11:00 AM",
    experience: "11 years",
    languages: ["English", "Urdu"],
    price: 4500,
    hospital: "Liaquat National Hospital",
    city: "Karachi",
    about: "Neurologist with expertise in headaches, epilepsy, and stroke prevention.",
    education: ["MBBS — DUHS", "FCPS Neurology — CPSP"],
  },
];

export const medicalSpecialties: MedicalSpecialty[] = [
  { name: "Cardiology", color: "#EF4444", icon: "Heart" },
  { name: "Pediatrics", color: "#10B981", icon: "Baby" },
  { name: "Dermatology", color: "#8B5CF6", icon: "Sparkles" },
  { name: "Orthopedics", color: "#F59E0B", icon: "Stethoscope" },
  { name: "Neurology", color: "#0891B2", icon: "Brain" },
  { name: "General", color: "#6B7280", icon: "Stethoscope" },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    doctorImage: doctors[0].image,
    doctorName: doctors[0].name,
    specialty: doctors[0].specialty,
    date: "Today",
    time: "3:00 PM",
    duration: "30 min",
    type: "video",
    status: "upcoming",
  },
  {
    id: "a2",
    doctorImage: doctors[2].image,
    doctorName: doctors[2].name,
    specialty: doctors[2].specialty,
    date: "Apr 14, 2026",
    time: "11:30 AM",
    duration: "45 min",
    type: "in-person",
    status: "upcoming",
  },
  {
    id: "a3",
    doctorImage: doctors[1].image,
    doctorName: doctors[1].name,
    specialty: doctors[1].specialty,
    date: "Mar 28, 2026",
    time: "10:00 AM",
    duration: "30 min",
    type: "in-person",
    status: "completed",
  },
  {
    id: "a4",
    doctorImage: doctors[4].image,
    doctorName: doctors[4].name,
    specialty: doctors[4].specialty,
    date: "Mar 10, 2026",
    time: "2:00 PM",
    duration: "30 min",
    type: "video",
    status: "cancelled",
  },
];

export const userProfile: UserProfile = {
  name: "Ali Hassan",
  email: "ali.hassan@email.com",
  phone: "+92 300 1234567",
  avatar: doctorImg("1507003211169-0a1dd7228f2d"),
};

export const healthStats: HealthStats = {
  weight: "72 kg",
  height: "178 cm",
  bmi: "22.7",
  bloodType: "B+",
  heartRate: "72 bpm",
  bloodPressure: "118/76",
};

export const timeSlots: string[] = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];
