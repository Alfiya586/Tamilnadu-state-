import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext(null);

const DEFAULT_COMPLAINTS = [
  {
    trackingId: "TN-REP-78291",
    category: "Potholes & Road Damage",
    title: "Deep pothole on Anna Salai service lane near Thousand Lights",
    description: "Dangerous crater after monsoon rains causing heavy two-wheeler skidding during night hours.",
    location: "Thousand Lights, Chennai",
    district: "Chennai",
    date: "2026-09-18",
    status: "In Progress",
    department: "Greater Chennai Corporation (Bus Route Roads Wing)",
    timeline: [
      { step: "Submitted", date: "Sep 18, 2026 - 10:15 AM", done: true, notes: "Received via TN ONE Portal" },
      { step: "Inspection Assigned", date: "Sep 19, 2026 - 02:30 PM", done: true, notes: "Assistant Engineer site visited" },
      { step: "Work Order Issued", date: "Sep 20, 2026 - 11:00 AM", done: true, notes: "Cold mix asphalt patching scheduled" },
      { step: "Resolution & Closure", date: "Pending", done: false, notes: "Target completion within 48 hours" }
    ],
    photoUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
  },
  {
    trackingId: "TN-REP-64910",
    category: "Broken Streetlights",
    title: "Continuous 4 LED streetlights failure on Gandhipuram 5th cross",
    description: "Completely pitch dark stretch for children and elderly walking from evening bus stand.",
    location: "Gandhipuram, Coimbatore",
    district: "Coimbatore",
    date: "2026-09-12",
    status: "Resolved",
    department: "Coimbatore City Municipal Corporation (Electrical)",
    timeline: [
      { step: "Submitted", date: "Sep 12, 2026 - 08:20 PM", done: true, notes: "Grievance auto-routed to Ward 32" },
      { step: "Inspection Assigned", date: "Sep 13, 2026 - 10:00 AM", done: true, notes: "Cable fault identified at junction box" },
      { step: "Work Order Issued", date: "Sep 13, 2026 - 04:00 PM", done: true, notes: "Cable repaired and fittings replaced" },
      { step: "Resolution & Closure", date: "Sep 14, 2026 - 07:00 PM", done: true, notes: "Illumination verified by Ward Inspector" }
    ],
    photoUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80"
  }
];

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('tn_lang') || 'en';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tn_theme') || 'light';
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('tn_user');
    if (stored) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    // Default demo user for instant smooth experience
    return {
      name: "Selvakumar Pandian",
      email: "selva.pandian@gmail.com",
      phone: "+91 98401 23456",
      district: "Madurai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "citizen"
    };
  });

  const [savedPlaces, setSavedPlaces] = useState(() => {
    const s = localStorage.getItem('tn_saved_places');
    return s ? JSON.parse(s) : ["tour-1", "tour-6", "tour-3"];
  });

  const [savedServices, setSavedServices] = useState(() => {
    const s = localStorage.getItem('tn_saved_services');
    return s ? JSON.parse(s) : ["govt-services", "education", "certificates"];
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const s = localStorage.getItem('tn_saved_jobs');
    return s ? JSON.parse(s) : ["job-1", "job-2"];
  });

  const [savedScholarships, setSavedScholarships] = useState(() => {
    const s = localStorage.getItem('tn_saved_scholarships');
    return s ? JSON.parse(s) : ["sch-1", "sch-2"];
  });

  const [complaints, setComplaints] = useState(() => {
    const s = localStorage.getItem('tn_complaints');
    return s ? JSON.parse(s) : DEFAULT_COMPLAINTS;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState("");

  // Sync theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('tn_theme', theme);
  }, [theme]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('tn_lang', language);
  }, [language]);

  // Sync saved states
  useEffect(() => {
    localStorage.setItem('tn_saved_places', JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  useEffect(() => {
    localStorage.setItem('tn_saved_services', JSON.stringify(savedServices));
  }, [savedServices]);

  useEffect(() => {
    localStorage.setItem('tn_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('tn_saved_scholarships', JSON.stringify(savedScholarships));
  }, [savedScholarships]);

  useEffect(() => {
    localStorage.setItem('tn_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = (userData) => {
    const userObj = {
      name: userData.name || "Kavitha Ramanathan",
      email: userData.email || "kavitha.tn@example.com",
      phone: userData.phone || "+91 94440 98765",
      district: userData.district || "Chennai",
      role: userData.role || "citizen"
    };
    setUser(userObj);
    localStorage.setItem('tn_user', JSON.stringify(userObj));
    return userObj;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tn_user');
  };

  const toggleSavePlace = (id) => {
    setSavedPlaces(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSaveService = (id) => {
    setSavedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSaveJob = (id) => {
    setSavedJobs(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSaveScholarship = (id) => {
    setSavedScholarships(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addComplaint = (complaint) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingId = `TN-REP-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];
    const fullComplaint = {
      ...complaint,
      trackingId,
      date: today,
      status: "Submitted",
      department: complaint.department || "Tamil Nadu Civic Grievance Cell",
      timeline: [
        {
          step: "Submitted",
          date: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - Just Now`,
          done: true,
          notes: "Digital Grievance Registered and routed to local district nodal officer"
        },
        {
          step: "Inspection Assigned",
          date: "Pending",
          done: false,
          notes: "Local Ward Engineer notification queued"
        },
        {
          step: "Work Order Issued",
          date: "Pending",
          done: false,
          notes: "Tender or maintenance crew allocation"
        },
        {
          step: "Resolution & Closure",
          date: "Pending",
          done: false,
          notes: "Verification with GPS photo proof"
        }
      ]
    };
    setComplaints(prev => [fullComplaint, ...prev]);
    return fullComplaint;
  };

  const openAIChatWithPrompt = (prompt) => {
    setAiInitialPrompt(prompt);
    setIsAIChatOpen(true);
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        t,
        user,
        login,
        logout,
        savedPlaces,
        toggleSavePlace,
        savedServices,
        toggleSaveService,
        savedJobs,
        toggleSaveJob,
        savedScholarships,
        toggleSaveScholarship,
        complaints,
        addComplaint,
        isSearchOpen,
        setIsSearchOpen,
        isAIChatOpen,
        setIsAIChatOpen,
        aiInitialPrompt,
        setAiInitialPrompt,
        openAIChatWithPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
