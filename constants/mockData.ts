export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  experience: string;
  languages: string[];
  availableToday: boolean;
  nextAvailable: string;
  price: number;
  about: string;
  education: string[];
  hospital: string;
  city: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  specialty: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "audio" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
}

export interface Message {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ayesha Khan",
    specialty: "General Practitioner",
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    experience: "15 years",
    languages: ["English", "Urdu"],
    availableToday: true,
    nextAvailable: "2:30 PM",
    price: 2500,
    about: "Dr. Ayesha Khan is a board-certified general practitioner with extensive experience in preventive care and chronic disease management. She believes in a holistic approach to healthcare and has served at leading hospitals in Lahore.",
    education: ["King Edward Medical University", "Mayo Hospital Lahore"],
    hospital: "Shaukat Khanum Memorial Hospital",
    city: "Lahore",
  },
  {
    id: "2",
    name: "Dr. Muhammad Ali Shah",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    experience: "20 years",
    languages: ["English", "Urdu", "Punjabi"],
    availableToday: false,
    nextAvailable: "Tomorrow, 9:00 AM",
    price: 4000,
    about: "Dr. Muhammad Ali Shah specializes in interventional cardiology and heart failure management. He has performed over 5,000 cardiac procedures and is recognized as one of the top cardiologists in Karachi.",
    education: ["Dow Medical College", "NICVD Karachi"],
    hospital: "Tabba Heart Institute",
    city: "Karachi",
  },
  {
    id: "3",
    name: "Dr. Fatima Zahra",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 3156,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    experience: "12 years",
    languages: ["English", "Urdu"],
    availableToday: true,
    nextAvailable: "3:45 PM",
    price: 3000,
    about: "Dr. Fatima Zahra is an expert in medical and cosmetic dermatology. She has published numerous research papers on skin cancer prevention and is known for her patient-centered approach.",
    education: ["Fatima Jinnah Medical University", "Services Hospital Lahore"],
    hospital: "Doctors Hospital & Medical Center",
    city: "Lahore",
  },
  {
    id: "4",
    name: "Dr. Imran Hassan",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 2109,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    experience: "18 years",
    languages: ["English", "Urdu", "Punjabi"],
    availableToday: true,
    nextAvailable: "11:00 AM",
    price: 2800,
    about: "Dr. Imran Hassan is passionate about children's health and development. He has worked with thousands of families over his career and specializes in pediatric nutrition and immunization.",
    education: ["Allama Iqbal Medical College", "Children's Hospital Lahore"],
    hospital: "Shaukat Khanum Memorial Hospital",
    city: "Lahore",
  },
  {
    id: "5",
    name: "Dr. Sana Rafique",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
    experience: "14 years",
    languages: ["English", "Urdu"],
    availableToday: false,
    nextAvailable: "Wed, 2:00 PM",
    price: 4500,
    about: "Dr. Sana Rafique specializes in treating migraines, epilepsy, and movement disorders. She uses the latest diagnostic technology and has trained at top international institutions.",
    education: ["Aga Khan University", "Jinnah Postgraduate Medical Centre"],
    hospital: "Aga Khan University Hospital",
    city: "Karachi",
  },
  {
    id: "6",
    name: "Dr. Asif Mehmood",
    specialty: "Orthopedist",
    rating: 4.6,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    experience: "16 years",
    languages: ["English", "Urdu", "Punjabi"],
    availableToday: true,
    nextAvailable: "4:15 PM",
    price: 3500,
    about: "Dr. Asif Mehmood is a sports medicine specialist who has worked with professional athletes including the Pakistan cricket team. He focuses on minimally invasive procedures and joint replacement surgery.",
    education: ["Army Medical College", "CMH Lahore"],
    hospital: "National Hospital & Medical Centre",
    city: "Lahore",
  },
  {
    id: "7",
    name: "Dr. Nida Tariq",
    specialty: "Gynecologist",
    rating: 4.9,
    reviews: 3241,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
    experience: "13 years",
    languages: ["English", "Urdu"],
    availableToday: true,
    nextAvailable: "10:30 AM",
    price: 3200,
    about: "Dr. Nida Tariq specializes in obstetrics and gynecology with expertise in high-risk pregnancies. She is committed to providing compassionate care to women at all stages of life.",
    education: ["Rawalpindi Medical University", "Holy Family Hospital"],
    hospital: "Maroof International Hospital",
    city: "Islamabad",
  },
  {
    id: "8",
    name: "Dr. Zafar Iqbal",
    specialty: "Psychiatrist",
    rating: 4.7,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    experience: "19 years",
    languages: ["English", "Urdu", "Punjabi"],
    availableToday: false,
    nextAvailable: "Thu, 3:00 PM",
    price: 3800,
    about: "Dr. Zafar Iqbal is a leading psychiatrist specializing in anxiety, depression, and addiction treatment. He combines modern psychiatry with culturally sensitive approaches for Pakistani patients.",
    education: ["Punjab Medical College", "Gulab Devi Hospital"],
    hospital: "Punjab Institute of Mental Health",
    city: "Lahore",
  },
];

export const appointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Ayesha Khan",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    specialty: "General Practitioner",
    date: "Today",
    time: "2:30 PM",
    duration: "30 min",
    type: "video",
    status: "upcoming",
  },
  {
    id: "2",
    doctorId: "3",
    doctorName: "Dr. Fatima Zahra",
    doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    specialty: "Dermatologist",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "45 min",
    type: "in-person",
    status: "upcoming",
  },
  {
    id: "3",
    doctorId: "2",
    doctorName: "Dr. Muhammad Ali Shah",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    specialty: "Cardiologist",
    date: "Last week",
    time: "3:00 PM",
    duration: "30 min",
    type: "video",
    status: "completed",
  },
];

export const messages: Message[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Ayesha Khan",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    lastMessage: "Your test results look great! Let's discuss them in our next appointment.",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    doctorId: "3",
    doctorName: "Dr. Fatima Zahra",
    doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    lastMessage: "Please apply the prescribed cream twice daily.",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "3",
    doctorId: "2",
    doctorName: "Dr. Muhammad Ali Shah",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    lastMessage: "Thank you for visiting. Remember to monitor your blood pressure daily.",
    timestamp: "3 days ago",
    unreadCount: 0,
  },
];

export interface MedicalSpecialty {
  name: string;
  icon: string;
  color: string;
}

export const medicalSpecialties: MedicalSpecialty[] = [
  { name: "General", icon: "Stethoscope", color: "#3B82F6" },
  { name: "Cardiology", icon: "Heart", color: "#EF4444" },
  { name: "Dermatology", icon: "Sparkles", color: "#8B5CF6" },
  { name: "Pediatrics", icon: "Baby", color: "#F59E0B" },
  { name: "Neurology", icon: "Brain", color: "#10B981" },
  { name: "Orthopedics", icon: "Bone", color: "#EC4899" },
  { name: "Gynecology", icon: "Heart", color: "#F472B6" },
  { name: "Psychiatry", icon: "BrainCircuit", color: "#6366F1" },
];

export const healthStats = {
  weight: "72 kg",
  height: "175 cm",
  bmi: "23.5",
  bloodPressure: "120/80",
  heartRate: "72 bpm",
  bloodType: "O+",
  lastCheckup: "2 weeks ago",
};

export const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
];

export const userProfile = {
  name: "Ahmad Raza",
  email: "ahmad.raza@email.com",
  phone: "+92 321 1234567",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  city: "Lahore",
  age: 32,
};
