"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import { useAuth } from "@/contexts/AuthContext"

export default function MembersPage() {
  const { isAdmin } = useAuth()
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Member",
    department: "",
    year: "",
    status: "Pending",
  })

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = () => {
    const data = storage.get(STORAGE_KEYS.MEMBERS) || []
    setMembers(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingMember) {
      // Update existing member
      const updated = members.map((m) => (m.id === editingMember.id ? { ...formData, id: m.id, joinDate: m.joinDate } : m))
      storage.set(STORAGE_KEYS.MEMBERS, updated)
      setMembers(updated)
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: Date.now().toString(),
        joinDate: new Date().toISOString().split("T")[0],
      }
      const updated = [...members, newMember]
      storage.set(STORAGE_KEYS.MEMBERS, updated)
      setMembers(updated)
    }

    resetForm()
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      department: member.department,
      year: member.year,
      status: member.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const updated = members.filter((m) => m.id !== id)
      storage.set(STORAGE_KEYS.MEMBERS, updated)
      setMembers(updated)
    }
  }

  const handleApprove = (id) => {
    const updated = members.map((m) => (m.id === id ? { ...m, status: "Active" } : m))
    storage.set(STORAGE_KEYS.MEMBERS, updated)
    setMembers(updated)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "Member",
      department: "",
      year: "",
      status: "Pending",
    })
    setEditingMember(null)
    setShowModal(false)
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "All" || member.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "Active").length,
    pending: members.filter((m) => m.status === "Pending").length,
    inactive: members.filter((m) => m.status === "Inactive").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Members Management</h1>
            <p className="text-muted-foreground mt-1">Manage and oversee all IT club members</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Members</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Active</p>
                <p className="text-3xl font-bold text-green-500">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-amber-500">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Inactive</p>
                <p className="text-3xl font-bold text-red-500">{stats.inactive}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("All")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-input text-foreground hover:bg-accent"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("Active")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-background border border-input text-foreground hover:bg-accent"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus("Pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "Pending"
                    ? "bg-amber-500 text-white"
                    : "bg-background border border-input text-foreground hover:bg-accent"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus("Inactive")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === "Inactive"
                    ? "bg-red-500 text-white"
                    : "bg-background border border-input text-foreground hover:bg-accent"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Member</th>
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Email</th>
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Department</th>
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Year</th>
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Join Date</th>
                  <th className="text-left py-4 px-6 text-foreground font-semibold">Status</th>
                  {isAdmin && <th className="text-left py-4 px-6 text-foreground font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{member.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm">{member.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-foreground">{member.department}</td>
                    <td className="py-4 px-6 text-foreground">{member.year}</td>
                    <td className="py-4 px-6 text-muted-foreground">{member.joinDate}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          member.status === "Active"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : member.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {member.status === "Pending" && (
                            <button
                              onClick={() => handleApprove(member.id)}
                              className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-all border border-green-500/20 hover:border-green-500/40"
                              title="Approve"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-all border border-accent/20 hover:border-accent/40"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-all border border-destructive/20 hover:border-destructive/40"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No members found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingMember ? "Edit Member" : "Add New Member"}
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
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                  {editingMember ? "Update" : "Add"} Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}