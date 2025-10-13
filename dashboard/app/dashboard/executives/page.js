"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import { useAuth } from "@/contexts/AuthContext"

export default function ExecutivesPage() {
  const isAdmin = true;
  const [executives, setExecutives] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState(null)
  const [loadingFetch, setLoadingFetch] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    year: "",
    bio: "",
  })

  useEffect(() => {
    loadExecutives()
  }, [])

  const loadExecutives = () => {
    const data = storage.get(STORAGE_KEYS.EXECUTIVES) || []
    setExecutives(data)
  }

  const saveExecutives = (list) => {
    storage.set(STORAGE_KEYS.EXECUTIVES, list)
    setExecutives(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingExecutive) {
      // Update existing executive
      const updated = executives.map((ex) =>
        ex.id === editingExecutive.id ? { ...formData, id: ex.id, joinDate: ex.joinDate || new Date().toISOString().split("T")[0] } : ex
      )
      saveExecutives(updated)
    } else {
      // Add new executive
      const newExecutive = {
        ...formData,
        id: Date.now().toString(),
        joinDate: new Date().toISOString().split("T")[0],
      }
      const updated = [...executives, newExecutive]
      saveExecutives(updated)
    }

    resetForm()
  }

  const handleEdit = (executive) => {
    setEditingExecutive(executive)
    setFormData({
      name: executive.name || "",
      email: executive.email || "",
      position: executive.position || "",
      department: executive.department || "",
      year: executive.year || "",
      bio: executive.bio || "",
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this executive?")) {
      const updated = executives.filter((ex) => ex.id !== id)
      saveExecutives(updated)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      year: "",
      bio: "",
    })
    setEditingExecutive(null)
    setShowModal(false)
  }

  // Open add modal and ensure form is cleared
  const openAddModal = () => {
    setEditingExecutive(null)
    setFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      year: "",
      bio: "",
    })
    setShowModal(true)
  }

  // Demo data - can be loaded by admin
  const demoExecutives = [
    {
      id: "demo-1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      position: "President",
      department: "Computer Science",
      year: "4th Year",
      bio: "Leading the club and coordinating initiatives.",
      joinDate: "2024-01-15",
    },
    {
      id: "demo-2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      position: "Technical Lead",
      department: "Information Technology",
      year: "3rd Year",
      bio: "Handles technical workshops and projects.",
      joinDate: "2024-02-01",
    },
    {
      id: "demo-3",
      name: "Carol Lee",
      email: "carol.lee@example.com",
      position: "Event Coordinator",
      department: "Electronics",
      year: "2nd Year",
      bio: "Organizes events and liaises with sponsors.",
      joinDate: "2024-03-01",
    },
  ]

  // Load demo members (overwrites/merges based on preference)
  const loadDemoMembers = (merge = false) => {
    if (!isAdmin) return
    if (!merge) {
      saveExecutives(demoExecutives)
    } else {
      // merge: keep existing unique ids, add demo ones that don't exist
      const existingIds = new Set(executives.map((e) => e.id))
      const merged = [...executives, ...demoExecutives.filter((d) => !existingIds.has(d.id))]
      saveExecutives(merged)
    }
    alert("Demo executives loaded.")
  }

  // Demo fetch: fetch a sample user and map to executive fields
  const fetchDemoExecutive = async () => {
    if (!isAdmin) return
    setLoadingFetch(true)
    try {
      // using jsonplaceholder as a demo fetch endpoint
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
      if (!res.ok) throw new Error("Failed to fetch demo user")
      const user = await res.json()
      const fetched = {
        id: `fetched-${Date.now()}`,
        name: user.name || "Fetched User",
        email: user.email || "fetched@example.com",
        position: "Marketing Head",
        department: user.company?.name || "Marketing",
        year: "3rd Year",
        bio: `Fetched from demo API. Company: ${user.company?.name || "N/A"}`,
        joinDate: new Date().toISOString().split("T")[0],
      }
      const updated = [...executives, fetched]
      saveExecutives(updated)
      alert(`Fetched and added: ${fetched.name}`)
    } catch (err) {
      console.error(err)
      alert("Failed to fetch demo executive.")
    } finally {
      setLoadingFetch(false)
    }
  }

  const positionOrder = ["President", "Vice President", "Secretary", "Treasurer", "Technical Lead", "Event Coordinator", "Marketing Head", "Design Lead"]

  const sortedExecutives = [...executives].sort((a, b) => {
    const aIndex = positionOrder.indexOf(a.position)
    const bIndex = positionOrder.indexOf(b.position)
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Executive Board</h1>
            <p className="text-muted-foreground mt-1">Meet the leadership team of IT Club</p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <>
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Executive
                </button>

                <button
                  onClick={() => loadDemoMembers(false)}
                  className="px-3 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg font-medium transition-colors"
                  title="Load demo members (overwrite)"
                >
                  Load Demo Members
                </button>

                <button
                  onClick={() => loadDemoMembers(true)}
                  className="px-3 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg font-medium transition-colors"
                  title="Merge demo members with existing list"
                >
                  Merge Demo Members
                </button>

                <button
                  onClick={fetchDemoExecutive}
                  disabled={loadingFetch}
                  className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg font-medium transition-colors"
                >
                  {loadingFetch ? "Fetching..." : "Fetch Demo Member"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedExecutives.map((executive) => (
            <div
              key={executive.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Header with gradient */}
              <div className="h-24 bg-gradient-to-br from-primary via-primary to-accent relative">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Profile */}
              <div className="px-6 pb-6">
                <div className="flex flex-col items-center -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center border-4 border-card">
                      <span className="text-3xl font-bold text-primary">{executive.name ? executive.name[0] : "?"}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">{executive.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-primary">{executive.position}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{executive.bio}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate">{executive.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>{executive.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{executive.year}</span>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={() => handleEdit(executive)}
                      className="flex-1 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(executive.id)}
                      className="flex-1 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {executives.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No executives yet</h3>
            <p className="text-muted-foreground">Add your first executive to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md my-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingExecutive ? "Edit Executive" : "Add New Executive"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Position</option>
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="Event Coordinator">Event Coordinator</option>
                  <option value="Marketing Head">Marketing Head</option>
                  <option value="Design Lead">Design Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Brief bio or role description..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  {editingExecutive ? "Update" : "Add"} Executive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
