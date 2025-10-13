"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import { useAuth } from "@/contexts/AuthContext"

export default function EventsPage() {
  const isAdmin = true;
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [loadingFetch, setLoadingFetch] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Workshop",
    status: "Upcoming",
    registrations: 0,
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    const data = storage.get(STORAGE_KEYS.EVENTS) || []
    setEvents(data)
  }

  const saveEvents = (list) => {
    storage.set(STORAGE_KEYS.EVENTS, list)
    setEvents(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingEvent) {
      // Update existing event
      const updated = events.map((ev) => (ev.id === editingEvent.id ? { ...formData, id: ev.id } : ev))
      saveEvents(updated)
    } else {
      // Add new event
      const newEvent = {
        ...formData,
        id: Date.now().toString(),
      }
      const updated = [...events, newEvent]
      saveEvents(updated)
    }

    resetForm()
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "Workshop",
      status: event.status || "Upcoming",
      registrations: event.registrations || 0,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updated = events.filter((ev) => ev.id !== id)
      saveEvents(updated)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Workshop",
      status: "Upcoming",
      registrations: 0,
    })
    setEditingEvent(null)
    setShowModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "registrations"
          ? // ensure numeric value for registrations
            parseInt(value || "0", 10)
          : value,
    }))
  }

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filterCategory === "All" || event.category === filterCategory
    const matchesStatus = filterStatus === "All" || event.status === filterStatus
    return matchesCategory && matchesStatus
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date))

  const getCategoryColor = (category) => {
    const colors = {
      Workshop: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Seminar: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Competition: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      Meetup: "bg-green-500/10 text-green-500 border-green-500/20",
      Hackathon: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return colors[category] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  const getStatusColor = (status) => {
    const colors = {
      Upcoming: "bg-green-500/10 text-green-500 border-green-500/20",
      Ongoing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Completed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return colors[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  // Demo data
  const demoEvents = [
    {
      id: "demo-1",
      title: "Intro to React",
      description: "Beginner friendly workshop on React basics.",
      date: "2024-11-05",
      time: "10:00",
      location: "Room A1",
      category: "Workshop",
      status: "Upcoming",
      registrations: 25,
    },
    {
      id: "demo-2",
      title: "Hackathon 48h",
      description: "Team up and build projects over a weekend.",
      date: "2024-10-20",
      time: "09:00",
      location: "Main Auditorium",
      category: "Hackathon",
      status: "Upcoming",
      registrations: 120,
    },
    {
      id: "demo-3",
      title: "Tech Meetup",
      description: "Networking and lightning talks from students.",
      date: "2024-09-15",
      time: "18:00",
      location: "Cafeteria",
      category: "Meetup",
      status: "Completed",
      registrations: 60,
    },
  ]

  // Load demo events. If merge = false, overwrite; if true, add non-duplicates
  const loadDemoEvents = (merge = false) => {
    if (!isAdmin) return
    if (!merge) {
      saveEvents(demoEvents)
      alert("Demo events loaded (overwrite).")
    } else {
      const existingIds = new Set(events.map((e) => e.id))
      const merged = [...events, ...demoEvents.filter((d) => !existingIds.has(d.id))]
      saveEvents(merged)
      alert("Demo events merged.")
    }
  }

  // Fetch a demo event (maps a fetched user/post to an event)
  const fetchDemoEvent = async () => {
    if (!isAdmin) return
    setLoadingFetch(true)
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
      if (!res.ok) throw new Error("Failed to fetch demo data")
      const user = await res.json()
      const fetched = {
        id: `fetched-${Date.now()}`,
        title: `Talk by ${user.name}`,
        description: `Guest talk. Company: ${user.company?.name || "N/A"}. Email: ${user.email}`,
        date: new Date().toISOString().split("T")[0],
        time: "17:00",
        location: user.address?.city || "TBD",
        category: "Seminar",
        status: "Upcoming",
        registrations: Math.floor(Math.random() * 50),
      }
      saveEvents([...events, fetched])
      alert(`Fetched and added: ${fetched.title}`)
    } catch (err) {
      console.error(err)
      alert("Failed to fetch demo event.")
    } finally {
      setLoadingFetch(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground mt-1">Manage and track IT club events</p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingEvent(null)
                  resetForm()
                  setShowModal(true)
                }}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </button>

              <button
                onClick={() => loadDemoEvents(false)}
                className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors"
              >
                Load Demo
              </button>

              <button
                onClick={() => loadDemoEvents(true)}
                className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors"
              >
                Merge Demo
              </button>

              <button
                onClick={fetchDemoEvent}
                disabled={loadingFetch}
                className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors"
              >
                {loadingFetch ? "Fetching..." : "Fetch Demo"}
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Competition</option>
              <option>Meetup</option>
              <option>Hackathon</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All</option>
              <option>Upcoming</option>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {sortedEvents.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground">
              No events found.
            </div>
          ) : (
            sortedEvents.map((event) => (
              <div key={event.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{new Date(event.date).getDate()}</span>
                      <span className="text-xs text-primary font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-3">
                      <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(event.category)}`}
                      >
                        {event.category}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M3 7l9-6 9 6"
                          />
                        </svg>
                        <span>{event.registrations} Registrations</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {isAdmin && (
                    <div className="flex-shrink-0 self-start flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6 relative">
<button
  onClick={resetForm}
  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
            <h2 className="text-2xl font-bold mb-4">{editingEvent ? "Edit Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </form>
          </div>
        </div>
      )}

   
    </DashboardLayout>
  );
}