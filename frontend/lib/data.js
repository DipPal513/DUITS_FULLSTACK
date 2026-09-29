/* ------------------------------------------------------------------
   PLACEHOLDER CONTENT. Replace with real DUITS data or wire to Supabase.
   ------------------------------------------------------------------ */
export const NOTICES = [
    { id: "IRQ_01", level: "CRITICAL", text: "Executive Committee Recruitment Form is LIVE", detail: "Applications are open now. Submit yours through the membership portal." },
    { id: "IRQ_02", level: "INFO", text: "AI Bootcamp registration is open", detail: "Seats are limited. Beginners welcome, no prior ML experience needed." },
    { id: "IRQ_03", level: "INFO", text: "Inter-university hackathon: team formation is open", detail: "Find teammates from any wing and register your squad." },
    { id: "IRQ_04", level: "OK", text: "Weekly programming contest runs every Friday", detail: "Open to all members. Editorials are posted after each round." },
];
export const GPU_CARDS = [
    { kind: "MODEL", id: "TENSOR_01", title: "Bangla Handwriting OCR", blurb: "A compact recognition model trained by members on scanned exam scripts and forms.", metrics: [{ label: "ACCURACY", value: "94.2%" }, { label: "PARAMS", value: "38M" }, { label: "LATENCY", value: "120ms" }], stack: ["PyTorch", "ONNX"] },
    { kind: "LEADERBOARD", id: "RANK_02", title: "DUITS Programming Ladder", blurb: "Season standings from our weekly contests.", rows: [{ handle: "HANDLE_01", rating: 2140, solved: 412 }, { handle: "HANDLE_02", rating: 2075, solved: 388 }, { handle: "HANDLE_03", rating: 1988, solved: 351 }, { handle: "HANDLE_04", rating: 1931, solved: 337 }] },
    { kind: "DEPLOY", id: "DEPLOY_03", title: "Campus Notice API", blurb: "A full-stack service that gathers department notices into one searchable feed.", stack: ["Next.js", "Supabase", "Vercel"], status: "IN PRODUCTION" },
    { kind: "MODEL", id: "TENSOR_04", title: "Campus Assistant", blurb: "A retrieval-based chatbot that answers admission and society questions.", metrics: [{ label: "RECALL@5", value: "91%" }, { label: "DOCS", value: "2.4k" }, { label: "P95", value: "1.8s" }], stack: ["RAG", "FastAPI"] },
    { kind: "LEADERBOARD", id: "RANK_05", title: "ICPC Prep Squads", blurb: "Team rankings from mock regionals.", rows: [{ handle: "SQUAD_A", rating: 1820, solved: 96 }, { handle: "SQUAD_B", rating: 1774, solved: 91 }, { handle: "SQUAD_C", rating: 1702, solved: 84 }, { handle: "SQUAD_D", rating: 1655, solved: 79 }] },
    { kind: "DEPLOY", id: "DEPLOY_06", title: "Lost & Found Portal", blurb: "Students post and match lost items across campus halls.", stack: ["React", "Node", "PostgreSQL"], status: "BETA" },
];
export const EVENTS = [
    { id: "EVT_01", cat: "AI_BOOTCAMP", date: "OCT 2026", title: "AI & Machine Learning Bootcamp", place: "TSC, University of Dhaka", status: "OPEN", desc: "Six weeks from Python basics to training and deploying your first model." },
    { id: "EVT_02", cat: "HACKATHON", date: "NOV 2026", title: "National Inter-University Hackathon", place: "Hybrid", status: "UPCOMING", desc: "Thirty-hour build sprint with mentors from industry and academia." },
    { id: "EVT_03", cat: "WORKSHOP", date: "NOV 2026", title: "Full-Stack Web Workshop", place: "Faculty of Science", status: "UPCOMING", desc: "Ship a working app with Next.js and a database in one weekend." },
    { id: "EVT_04", cat: "TECH_SESSION", date: "DEC 2026", title: "Careers in Tech: Alumni Panel", place: "Online", status: "UPCOMING", desc: "Alumni share how they got their first roles and what they wish they'd learned earlier." },
    { id: "EVT_05", cat: "WORKSHOP", date: "SEP 2026", title: "Competitive Programming Camp", place: "Computer Lab", status: "COMPLETED", desc: "Graphs, DP and contest strategy, with problem sets and a live mock contest." },
    { id: "EVT_06", cat: "HACKATHON", date: "AUG 2026", title: "Campus Hack Night", place: "DUITS Office", status: "COMPLETED", desc: "An overnight build for first-time hackers, with pizza and pair programming." },
];
export const ACHIEVEMENTS = [
    { id: "NVME_00", kind: "trophy", title: "National Hackathon Champions", detail: "First place among university teams nationwide.", year: "2025", health: 1 },
    { id: "NVME_01", kind: "research", title: "Peer-Reviewed Paper on Bangla NLP", detail: "Published by DUITS AI wing members at an international workshop.", year: "2025", health: 0.92 },
    { id: "NVME_02", kind: "ranking", title: "Top 10 in National Programming Contest", detail: "Two DUITS teams placed in the national top ten.", year: "2025", health: 0.86 },
    { id: "NVME_03", kind: "trophy", title: "Best Innovation Award", detail: "Awarded for the campus notice aggregation platform.", year: "2024", health: 0.8 },
    { id: "NVME_04", kind: "research", title: "Open Dataset Release", detail: "A student-collected dataset now used by other university labs.", year: "2024", health: 0.74 },
    { id: "NVME_05", kind: "ranking", title: "Regional ICPC Qualification", detail: "Members qualified through the preliminary rounds.", year: "2024", health: 0.68 },
];
export const EXEC_FALLBACK = [
    { id: "core-1", name: "President", role: "President", sub: "System Controller" },
    { id: "core-2", name: "General Secretary", role: "General Secretary", sub: "Operations" },
    { id: "core-3", name: "AI & ML Lead", role: "Wing Lead", sub: "AI & Machine Learning" },
    { id: "core-4", name: "Development Lead", role: "Wing Lead", sub: "Software Engineering" },
    { id: "core-5", name: "Programming Lead", role: "Wing Lead", sub: "Competitive Programming" },
    { id: "core-6", name: "Media Lead", role: "Wing Lead", sub: "Digital Media" },
];
export const SECTIONS = [
    { id: "cpu", code: "CPU", label: "Central Processing Core" },
    { id: "diagnostics", code: "IRQ", label: "System Diagnostics" },
    { id: "gpu", code: "GPU", label: "AI & Development" },
    { id: "events", code: "I/O", label: "Events & Workshops" },
    { id: "storage", code: "NVMe", label: "Achievements" },
    { id: "controller", code: "CTRL", label: "Executive Committee" },
    { id: "psu", code: "PSU", label: "Footer & Contact" },
];
