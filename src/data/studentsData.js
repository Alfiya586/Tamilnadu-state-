export const studentSections = [
  "All",
  "Scholarships",
  "Colleges",
  "Courses",
  "Internships",
  "Government Exams",
  "Skill Development",
  "Career Resources"
];

export const scholarshipsData = [
  {
    id: "sch-1",
    title: "Naan Mudhalvan Youth Skill Stipend & Free Training",
    category: "Scholarships",
    provider: "Tamil Nadu Skill Development Corporation (TNSDC)",
    eligibility: "College graduates and final year students across TN government & aided colleges",
    benefit: "₹1,000 to ₹5,000 / month + Free Industry Certified Tech Courses (AI, Cloud, Robotics)",
    deadline: "Open Year-Round",
    officialLink: "https://naanmudhalvan.tn.gov.in",
    tags: ["State Flagship", "Skill Training", "Tech Certification"]
  },
  {
    id: "sch-2",
    title: "Moovalur Ramamirtham Ammaiyar Puthumai Penn Scheme",
    category: "Scholarships",
    provider: "Social Welfare & Women Empowerment Dept",
    eligibility: "Girl students who studied classes 6th to 12th in Tamil Nadu Government schools",
    benefit: "₹1,000 monthly bank deposit directly until completion of UG Degree/Diploma",
    deadline: "Announced every academic semester",
    officialLink: "https://penkalvi.tn.gov.in",
    tags: ["Women Empowerment", "Higher Education", "Direct Benefit Transfer"]
  },
  {
    id: "sch-3",
    title: "Tamil Pudhalvan Scheme for Male Students",
    category: "Scholarships",
    provider: "Government of Tamil Nadu",
    eligibility: "Male students from government schools pursuing collegiate or polytechnic studies",
    benefit: "₹1,000 per month for purchase of textbooks, stationery, and examination fees",
    deadline: "Rolling Admissions",
    officialLink: "https://www.tn.gov.in",
    tags: ["Higher Education", "Financial Support", "Govt School Alumni"]
  },
  {
    id: "sch-4",
    title: "Chief Minister's Research Fellowship (CMRF)",
    category: "Scholarships",
    provider: "Tamil Nadu State Council for Higher Education (TANSCHE)",
    eligibility: "Full-time Ph.D. scholars enrolled in State Universities of Tamil Nadu",
    benefit: "₹25,000 monthly fellowship + ₹20,000 annual research contingency grant",
    deadline: "Annual Notification (August)",
    officialLink: "https://tansche.tn.gov.in",
    tags: ["Ph.D. Scholars", "Research", "High Value Fellowship"]
  },
  {
    id: "sch-5",
    title: "First Graduate (Muthal Pattathari) Tuition Fee Waiver",
    category: "Scholarships",
    provider: "Directorate of Technical Education (DOTE)",
    eligibility: "Students who are the first in their entire family to attend higher college education",
    benefit: "100% waiver of tuition fee in Engineering, Medical, and Professional colleges",
    deadline: "During Single Window Counseling",
    officialLink: "https://tneaonline.org",
    tags: ["Tuition Waiver", "First Graduate", "Engineering & Medical"]
  }
];

export const collegesData = [
  {
    id: "col-1",
    name: "College of Engineering, Guindy (Anna University)",
    category: "Colleges",
    location: "Chennai",
    type: "State Government Premier University",
    ranking: "NIRF Top 15 in India",
    courses: ["B.E. Computer Science", "B.Tech AI & Data Science", "B.E. Mechanical", "ECE", "Biomedical"],
    intakeVia: "TNEA Single Window Counseling",
    website: "https://annauniv.edu"
  },
  {
    id: "col-2",
    name: "PSG College of Technology",
    category: "Colleges",
    location: "Coimbatore",
    type: "Autonomous Government-Aided Institute",
    ranking: "Premier Industry-Integrated Engineering College",
    courses: ["B.E. Robotics & Automation", "B.E. Production Engg", "M.Tech Software", "Automobile Engg"],
    intakeVia: "TNEA / Management Merit",
    website: "https://psgtech.edu"
  },
  {
    id: "col-3",
    name: "Madras Medical College (MMC Chennai)",
    category: "Colleges",
    location: "Chennai",
    type: "Government Medical College (est. 1835)",
    ranking: "Among Top 5 Medical Colleges in India",
    courses: ["MBBS", "MD / MS Specialities", "B.Pharm", "B.Sc Nursing"],
    intakeVia: "NEET UG / PG State Quota",
    website: "https://mmc.ac.in"
  },
  {
    id: "col-4",
    name: "Thiagarajar College of Engineering (TCE)",
    category: "Colleges",
    location: "Madurai",
    type: "Autonomous Government-Aided",
    ranking: "Premier South TN Technical Institute",
    courses: ["Civil Engineering", "Computer Science", "Information Technology", "Mechatronics"],
    intakeVia: "TNEA Counseling",
    website: "https://tce.edu"
  },
  {
    id: "col-5",
    name: "Tamil Nadu Agricultural University (TNAU)",
    category: "Colleges",
    location: "Coimbatore",
    type: "State Agricultural University",
    ranking: "National Benchmark in Agronomy & Crop Genomics",
    courses: ["B.Sc (Hons) Agriculture", "B.Tech Agri Engineering", "B.Sc Horticulture", "Food Technology"],
    intakeVia: "TNAU Online Merit Admission",
    website: "https://tnau.ac.in"
  }
];

export const examsData = [
  {
    id: "ex-1",
    title: "TNPSC Group 1 (Deputy Collector / DSP)",
    category: "Government Exams",
    conductor: "Tamil Nadu Public Service Commission",
    qualification: "Any Bachelor's Degree",
    ageLimit: "21 to 37 years (Relaxations applicable)",
    stages: "Prelims (Objective) -> Mains (Descriptive) -> Personality Test / Interview",
    syllabusFocus: "General Studies, Aptitude, Tamil Society Culture and Heritage",
    website: "https://tnpsc.gov.in"
  },
  {
    id: "ex-2",
    title: "TNPSC Group 4 & VAO (Village Administrative Officer)",
    category: "Government Exams",
    conductor: "Tamil Nadu Public Service Commission",
    qualification: "SSLC / 10th Standard Pass",
    ageLimit: "18 to 32+ years",
    stages: "Single Stage OMR Written Exam (200 Questions / 300 Marks)",
    syllabusFocus: "General Tamil (100 Qs), General Studies (75 Qs), Aptitude (25 Qs)",
    website: "https://tnpsc.gov.in"
  },
  {
    id: "ex-3",
    title: "TNUSRB Police Sub-Inspector (SI) & Constable",
    category: "Government Exams",
    conductor: "Tamil Nadu Uniformed Services Recruitment Board",
    qualification: "Degree for SI; 10th/12th for Police Constable",
    ageLimit: "20 to 30 years",
    stages: "Tamil Eligibility Test -> Written Exam -> Physical Measurement & Endurance Test (PET)",
    syllabusFocus: "General Knowledge, Psychology, Logical Analysis",
    website: "https://tnusrb.tn.gov.in"
  },
  {
    id: "ex-4",
    title: "TRB PG Assistants & Polytechnic Lecturers",
    category: "Government Exams",
    conductor: "Teachers Recruitment Board Tamil Nadu",
    qualification: "Post Graduate Degree in relevant subject + B.Ed.",
    ageLimit: "Up to 50 years",
    stages: "Computer Based Test (CBT) + Certificate Verification",
    syllabusFocus: "Core Subject Discipline, Educational Methodology, GK",
    website: "https://trb.tn.gov.in"
  }
];

export const internshipsSkillsData = [
  {
    id: "sk-1",
    title: "Tamil Nadu e-Governance Agency (TNeGA) AI Internship",
    category: "Internships",
    host: "TNeGA Government of Tamil Nadu",
    duration: "3 to 6 Months (Full-time / Hybrid)",
    stipend: "₹15,000 to ₹20,000 / month",
    role: "AI/ML developer working on facial recognition for welfare, OCR for land records, and citizen chatbots.",
    eligibility: "B.Tech/M.Tech/MCA students with Python/FastAPI/PyTorch experience"
  },
  {
    id: "sk-2",
    title: "StartupTN Student Innovation Fellowships",
    category: "Skill Development",
    host: "Tamil Nadu Startup and Innovation Mission",
    duration: "6 Months",
    stipend: "Grant up to ₹1,00,000 for proof-of-concept prototypes",
    role: "Incubator residency, direct mentorship by venture capitalists, and intellectual property patent filing support.",
    eligibility: "College students with early-stage hardware/software startup concepts"
  },
  {
    id: "sk-3",
    title: "ELCOT Hardware & Cybersecurity Apprenticeship",
    category: "Internships",
    host: "Electronics Corporation of Tamil Nadu",
    duration: "1 Year",
    stipend: "₹12,000 / month + State Apprenticeship Certificate",
    role: "Hands-on data center infrastructure, network routing, firewall configurations, and server farm maintenance.",
    eligibility: "Diploma or B.E. in EEE/ECE/CSE"
  },
  {
    id: "sk-4",
    title: "TN Free Digital Library & Virtual Academy",
    category: "Career Resources",
    host: "Tamil Virtual Academy (TVA)",
    duration: "Self-Paced Free Online Access",
    stipend: "Free Certificate",
    role: "Access to 50,000+ digitized Tamil palm leaves, classical literature audio, and free civil services video lectures.",
    eligibility: "Open to all students and researchers"
  }
];
