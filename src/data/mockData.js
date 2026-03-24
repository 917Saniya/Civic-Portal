export const stats = {
  total: 48,
  pending: 11,
  progress: 17,
  resolved: 18,
  rejected: 2,
};

export const grievances = [
  {
    id: "GRV-1021",
    title: "Irregular Water Supply in Ward 4",
    department: "Water Department",
    description: "Water is available for only 20 minutes in the morning.",
    date: "2026-03-11",
    status: "pending",
  },
  {
    id: "GRV-1022",
    title: "Streetlight Not Working",
    department: "Electricity Board",
    description: "Two streetlights near the bus stand are not working.",
    date: "2026-03-09",
    status: "in_progress",
  },
  {
    id: "GRV-1023",
    title: "Garbage Collection Delay",
    department: "Sanitation",
    description: "Garbage has not been collected for three days.",
    date: "2026-03-06",
    status: "resolved",
  },
  {
    id: "GRV-1024",
    title: "Road Damage After Rain",
    department: "Public Works",
    description: "Deep potholes formed after heavy rain on main road.",
    date: "2026-03-02",
    status: "rejected",
  },
];

export const departmentStats = [
  { department: "Water", count: 22 },
  { department: "Electricity", count: 18 },
  { department: "Sanitation", count: 16 },
  { department: "Public Works", count: 20 },
  { department: "Health", count: 11 },
];

export const monthlyStats = [
  { month: "Oct", complaints: 26, resolved: 20 },
  { month: "Nov", complaints: 31, resolved: 24 },
  { month: "Dec", complaints: 29, resolved: 21 },
  { month: "Jan", complaints: 35, resolved: 27 },
  { month: "Feb", complaints: 32, resolved: 25 },
  { month: "Mar", complaints: 38, resolved: 28 },
];
