export const emergencyData = {
  primaryHelplines: [
    {
      id: "police",
      name: "Tamil Nadu Police",
      nameTa: "காவல்துறை",
      number: "100 / 112",
      description: "Immediate crime emergency, night patrolling SOS, and city police control room.",
      badge: "National Emergency",
      color: "blue",
      icon: "ShieldAlert",
      isDemo: true,
      priority: "Critical",
      title: "Tamil Nadu Police",
      type: "Crime & Security",
      demoNote: "Standard national emergency number. On this portal, simulated for demo purposes."
    },
    {
      id: "ambulance",
      name: "Medical Ambulance Emergency",
      nameTa: "அவசர ஆம்புலன்ஸ்",
      number: "108",
      description: "24/7 GVK-EMRI free government emergency medical response & trauma care dispatch.",
      badge: "Medical Response",
      color: "red",
      icon: "HeartPulse",
      isDemo: true,
      priority: "Critical",
      title: "Ambulance (GVK EMRI)",
      type: "Medical Response",
      demoNote: "Real-world TN 108 network. Simulated in this concept prototype."
    },
    {
      id: "fire",
      name: "Fire & Rescue Services",
      nameTa: "தீயணைப்பு & மீட்புப்பணி",
      number: "101",
      description: "Fire hazards, building rescues, chemical leaks, animal rescues, and flood evacuations.",
      badge: "Fire & Rescue",
      color: "orange",
      icon: "Flame",
      isDemo: true,
      priority: "Critical",
      title: "Fire & Rescue Control",
      type: "Disaster & Fire",
      demoNote: "Official statutory fire department dispatch code."
    },
    {
      id: "disaster",
      name: "State Disaster Management (TNSDMA)",
      nameTa: "மாநில பேரிடர் மேலாண்மை",
      number: "1070",
      description: "Cyclone tracking, flood alerts, landslide emergency, and relief camp allocation.",
      badge: "Disaster Control",
      color: "amber",
      icon: "AlertTriangle",
      isDemo: true,
      priority: "Critical",
      title: "State Disaster Management",
      type: "Cyclone & Flood",
      demoNote: "State Emergency Operation Centre (SEOC) helpline."
    }
  ],
  specialHelplines: [
    {
      id: "women",
      name: "Women Safety Helpline (Kavalan SOS)",
      title: "Women SOS & Safety",
      nameTa: "பெண்கள் பாதுகாப்பு உதவி",
      number: "181 / 1091",
      category: "Women & Domestic Safety",
      type: "Women Safety",
      priority: "High",
      description: "24/7 support against harassment, domestic distress, and confidential legal counseling.",
      icon: "UserCheck"
    },
    {
      id: "child",
      name: "Childline Emergency",
      title: "Childline Helpline",
      nameTa: "குழந்தைகள் உதவி மையம்",
      number: "1098",
      category: "Child Welfare",
      type: "Child Safety",
      priority: "High",
      description: "Protection against child labor, missing children, education disruption, and abuse.",
      icon: "Baby"
    },
    {
      id: "coastal",
      name: "Coastal Security Group",
      title: "Coastal Security & Maritime",
      nameTa: "கடலோரப் பாதுகாப்பு",
      number: "1093",
      category: "Maritime Safety",
      type: "Coast Guard",
      priority: "High",
      description: "Fishermen in distress at sea, coastal infiltration, and maritime rescue operations.",
      icon: "LifeBuoy"
    },
    {
      id: "cyber",
      name: "Cyber Crime Incident Portal",
      title: "Cyber Crime Financial Fraud",
      nameTa: "சைபர் கிரைம் உதவி",
      number: "1930",
      category: "Digital Financial Fraud",
      type: "Financial Cyber Fraud",
      priority: "High",
      description: "Immediate freezing of fraudulent bank and UPI transactions within the golden hour.",
      icon: "Lock"
    }
  ],
  majorTraumaHospitals: [
    {
      id: "hosp-1",
      district: "Chennai",
      name: "Rajiv Gandhi Government General Hospital (RGGGH)",
      phone: "+91 44 2530 5000",
      specialty: "Level-1 Trauma & Multi-Organ Transplant",
      beds: "3,000+ Beds",
      address: "EVR Periyar Salai, Park Town, Chennai - 600003"
    },
    {
      id: "hosp-2",
      district: "Coimbatore",
      name: "Coimbatore Medical College Hospital (CMCH)",
      phone: "+91 422 230 1393",
      specialty: "24/7 Trauma, Burns, & Cardiology",
      beds: "1,500+ Beds",
      address: "Trichy Road, Coimbatore - 641018"
    },
    {
      id: "hosp-3",
      district: "Madurai",
      name: "Government Rajaji Hospital (GRH)",
      phone: "+91 452 253 2535",
      specialty: "Emergency Neuro & Trauma Centre",
      beds: "2,500+ Beds",
      address: "Panagal Road, Shenoy Nagar, Madurai - 625020"
    },
    {
      id: "hosp-4",
      district: "Tiruchirappalli",
      name: "Mahatma Gandhi Memorial Government Hospital",
      phone: "+91 431 241 5555",
      specialty: "Pediatric ICU & Trauma Wing",
      beds: "1,200+ Beds",
      address: "Puthur, Tiruchirappalli - 620017"
    },
    {
      id: "hosp-5",
      district: "Salem",
      name: "Govt Mohan Kumaramangalam Medical College Hospital",
      phone: "+91 427 221 1133",
      specialty: "Regional Trauma & Critical Care",
      beds: "1,300+ Beds",
      address: "Salem Steel Plant Road, Salem - 636030"
    },
    {
      id: "hosp-6",
      district: "Kanyakumari",
      name: "Kanyakumari Govt Medical College Hospital",
      phone: "+91 4652 223201",
      specialty: "Casualty, Coastal Triage & Emergency",
      beds: "900+ Beds",
      address: "Asaripallam, Nagercoil - 629201"
    }
  ]
};

// Export convenient aliases
export const emergencyNumbers = [
  ...emergencyData.primaryHelplines,
  ...emergencyData.specialHelplines
];

export const hospitalNetworks = emergencyData.majorTraumaHospitals;

export const bloodBanksData = [
  {
    id: "bb-1",
    name: "Red Cross Central Blood Bank",
    district: "Chennai",
    phone: "+91 44 2855 4425",
    availableGroups: ["A+", "B+", "O+", "O-", "AB+"],
    stock: "420 Units"
  },
  {
    id: "bb-2",
    name: "Coimbatore Medical College Blood Centre",
    district: "Coimbatore",
    phone: "+91 422 230 0409",
    availableGroups: ["O+", "A+", "B+", "AB-"],
    stock: "280 Units"
  },
  {
    id: "bb-3",
    name: "Madurai Rajaji Blood Bank Transfusion Wing",
    district: "Madurai",
    phone: "+91 452 253 2535",
    availableGroups: ["O+", "O-", "B+", "AB+"],
    stock: "310 Units"
  },
  {
    id: "bb-4",
    name: "Tiruchi Rotary Central Blood Bank",
    district: "Tiruchirappalli",
    phone: "+91 431 246 1144",
    availableGroups: ["A+", "B+", "O+"],
    stock: "190 Units"
  },
  {
    id: "bb-5",
    name: "Salem City Govt Blood Bank",
    district: "Salem",
    phone: "+91 427 221 1133",
    availableGroups: ["O+", "A+", "B+", "AB+"],
    stock: "165 Units"
  },
  {
    id: "bb-6",
    name: "Kanyakumari District Blood Transfusion Wing",
    district: "Kanyakumari",
    phone: "+91 4652 223201",
    availableGroups: ["O+", "B+", "A+"],
    stock: "140 Units"
  }
];
