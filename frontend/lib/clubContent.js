// lib/clubContent.js
// All homepage copy lives here. Replace every placeholder with verified facts about DUITS.
import { Code2, BrainCircuit, Trophy, ShieldCheck, Cpu, Palette, Rocket, GraduationCap, Briefcase, Network, HeartHandshake, Users } from "lucide-react"

export const WINGS = [
  {
    id: "dev", icon: Code2, name: "Web & App Development", tagline: "Build products people use",
    desc: "Members design, build and launch real websites and mobile apps, from campus tools to open-source contributions.",
    does: ["Weekly build sessions and code reviews", "Team projects shipped to real users", "Hackathon and open-source sprints"],
    skills: ["React", "Next.js", "Flutter", "Git", "APIs"],
  },
  {
    id: "ai", icon: BrainCircuit, name: "AI & Data Science", tagline: "Learn from data, build with models",
    desc: "A wing for people curious about how machines learn, from statistics fundamentals to hands-on model building.",
    does: ["Reading groups on papers and courses", "Notebook workshops with real datasets", "Applied projects and Kaggle-style challenges"],
    skills: ["Python", "PyTorch", "Pandas", "Statistics"],
  },
  {
    id: "cp", icon: Trophy, name: "Competitive Programming", tagline: "Think fast, code faster",
    desc: "Structured practice for problem solvers preparing for ICPC and national programming contests.",
    does: ["Weekly problem sets by difficulty", "Mock contests and upsolving sessions", "Team formation for national rounds"],
    skills: ["C++", "Algorithms", "Data structures", "Teamwork"],
  },
  {
    id: "sec", icon: ShieldCheck, name: "Cybersecurity", tagline: "Break it to protect it",
    desc: "Learn how systems fail and how to defend them, through CTFs, labs and a culture of responsible disclosure.",
    does: ["CTF practice nights", "Networking and web security labs", "Talks from industry practitioners"],
    skills: ["CTF", "Networking", "Linux", "Web security"],
  },
  {
    id: "iot", icon: Cpu, name: "Robotics & IoT", tagline: "Code that moves in the real world",
    desc: "Hands-on hardware: sensors, microcontrollers and robots built by members from scratch.",
    does: ["Embedded programming workshops", "Build-and-demo hardware projects", "Robotics contest preparation"],
    skills: ["Arduino", "Sensors", "C/C++", "Circuits"],
  },
  {
    id: "design", icon: Palette, name: "Design & Media", tagline: "Make technology feel human",
    desc: "The wing behind the society's look and voice: UI/UX design, branding, photography and content.",
    does: ["Design critiques and UI/UX workshops", "Branding and event creative", "Photo, video and social content"],
    skills: ["Figma", "UI/UX", "Branding", "Video"],
  },
]

export const STATS = [
  { value: 450, suffix: "+", label: "Active members" },
  { value: WINGS.length, suffix: "", label: "Specialised wings" },
  { value: 60, suffix: "+", label: "Sessions each year" },
  { value: 30, suffix: "+", label: "Contests entered" },
]

export const POSITION = "One of the most active student-run tech communities at Dhaka University."

export const TIMELINE = [
  { label: "Founded", title: "A few students, one idea", body: "DUITS began as a small group who wanted a place on campus to learn technology together." },
  { label: "Growth", title: "From meetups to programs", body: "Regular workshops, seminars and peer learning brought in members from across departments." },
  { label: "Expansion", title: "Wings and specialisation", body: "Dedicated wings gave every interest, from code to design, its own home and its own mentors." },
  { label: "Today", title: "A campus-wide community", body: "Hundreds of members building projects, entering contests and helping each other grow." },
]

export const REASONS = [
  { icon: Rocket, title: "Learn by building", body: "Skip theory-only learning. Every wing works on real projects, so you leave with things you have made, not just things you have read." },
  { icon: GraduationCap, title: "Mentors who were you, recently", body: "Seniors and alumni guide juniors through choosing a track, debugging, and preparing for contests." },
  { icon: Briefcase, title: "A portfolio that speaks", body: "Shipped projects, contest results and talks you have given become proof of ability for internships and jobs." },
  { icon: Trophy, title: "Compete and represent DU", body: "Get coached for national programming, robotics and CTF contests, and go with a team." },
  { icon: Network, title: "Connections across campus", body: "Meet collaborators from every department, plus industry speakers and alumni working in tech." },
  { icon: HeartHandshake, title: "A community that shows up", body: "Stuck on a bug at midnight or unsure what to learn next? Someone here has been there." },
]

export const PRESIDENT_FALLBACK = { name: "The President", position: "President, DUITS", year: "" }
export const PRESIDENT_MESSAGE = {
  lead: "Technology is not something you watch from the outside. You learn it by touching it, breaking it, and building it again.",
  body: [
    "When we started thinking about what DUITS should be, the answer was simple: a place where curiosity gets company. Where a first-year who has never written a line of code sits next to a senior preparing for ICPC, and both leave a little better than they arrived.",
    "Every wing in this society exists so that no interest is left without a home. Whatever you are drawn to, there is a group here that will take it seriously, and take you seriously too.",
    "If you are wondering whether you are ready to join, you are. Come as you are, and we will build the rest together.",
  ],
}

export const FAQ = [
  { q: "Who can join DUITS?", a: "Any student of Dhaka University, from any department. You do not need to study computer science or IT." },
  { q: "Do I need to know how to code?", a: "No. Many members joined with zero experience. Wings run beginner-friendly sessions, and design and media need no coding at all." },
  { q: "How much time does it take?", a: "Most members spend a few hours a week. You choose how deep to go, from attending workshops to leading a project." },
  { q: "Can I be part of more than one wing?", a: "Yes. Plenty of members move between wings or combine them, for example development with design." },
  { q: "How do I become a member?", a: "Fill in the form on the membership page. The team will get back to you with next steps." },
]

export const ABOUT_BADGES = [
  { icon: GraduationCap, label: "Dhaka University" },
  { icon: Users, label: "Student-run" },
  { icon: Network, label: "Open to every department" },
]