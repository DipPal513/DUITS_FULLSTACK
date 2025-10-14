"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2, X, Mail, Building2, BookOpen, User, Filter, Eye } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"



export default function ExecutivesPage() {
  const isAdmin = true
  const [executives, setExecutives] = useState([])
  const [filteredExecutives, setFilteredExecutives] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState(null)
  const [selectedExecutive, setSelectedExecutive] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPosition, setFilterPosition] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")
const {token} = useAuth();

const baseURL = process.env.BASE_URL || 'http://localhost:5000/api/v1';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    year: "",
    bio: "",
  })

  

  useEffect(() => {
    console.log("use effect")
    loadExecutives()
  }, [])

  useEffect(() => {
    filterExecutives()
  }, [searchTerm, filterPosition, filterDepartment, executives])

  const loadExecutives = async () => {
    console.log("triggered")
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/executive`, {headers: {Authorization: `Bearer ${token}`}})
      setExecutives(res.data.data)
      console.log(res.data.data)
      setFilteredExecutives(res.data.data)

    } catch (error) {
      console.error("Error loading executives:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterExecutives = () => {
    let filtered = [...executives]

    if (searchTerm) {
      filtered = filtered.filter(exec =>
        exec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exec.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterPosition) {
      filtered = filtered.filter(exec => exec.position === filterPosition)
    }

    if (filterDepartment) {
      filtered = filtered.filter(exec => exec.department === filterDepartment)
    }

    setFilteredExecutives(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingExecutive) {
        // Update existing executive
        const res = await axios.put(`${baseURL}/executive/${editingExecutive.id}`, formData, {headers: {Authorization: `Bearer ${token}`}})
        const updatedExecs = executives.map(exec => exec.id === editingExecutive.id ? res.data.data : exec)
        setExecutives(updatedExecs)
        toast.success("Executive updated successfully")
      } else {
        // Add new executive
        const res = await axios.post(`${baseURL}/executive`, formData, {headers: {Authorization: `Bearer ${token}`}})
        setExecutives([res.data.data, ...executives])
        toast.success("Executive added successfully")
      }
      resetForm()
    } catch (error) {
      console.error("Error saving executive:", error)
      toast.error("Failed to save executive. Please try again.")
    } finally {
      setLoading(false)
    }
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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to remove this executive?")) {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const updated = executives.filter((ex) => ex.id !== id)
        setExecutives(updated)
      } catch (error) {
        console.error("Error deleting executive:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleShowDetails = (executive) => {
    setSelectedExecutive(executive)
    setShowDetailsModal(true)
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

  const openAddModal = () => {
    setEditingExecutive(null)
    setFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      year: "",
     
    })
    setShowModal(true)
  }

  const positions = ["President", "Vice President", "Secretary", "Treasurer", "Technical Lead", "Event Coordinator", "Marketing Head", "Design Lead"]
  const departments = [...new Set(executives.map(e => e.department))]

  const positionOrder = ["President", "Vice President", "Secretary", "Treasurer", "Technical Lead", "Event Coordinator", "Marketing Head", "Design Lead"]
  const sortedExecutives = [...filteredExecutives].sort((a, b) => {
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
            <h1 className="text-2xl font-bold text-slate-900">Executive Board</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your leadership team</p>
          </div>
          {isAdmin && (
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Executive
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search executives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          {(searchTerm || filterPosition || filterDepartment) && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Showing {sortedExecutives.length} of {executives.length} executives
              </span>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterPosition("")
                  setFilterDepartment("")
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Executives Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-slate-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : sortedExecutives.length > 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Executive</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sortedExecutives.map((executive) => (
                    <tr key={executive.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-indigo-600">
                              {executive.name[0]}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate">{executive.name}</div>
                            <div className="text-sm text-slate-500 truncate">{executive.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          {executive.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{executive.department}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{executive.year}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleShowDetails(executive)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => handleEdit(executive)}
                                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(executive.id)}
                                className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                <User className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-medium text-slate-900 mb-1">No executives found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingExecutive ? "Edit Executive" : "Add Executive"}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Position</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                  <select
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : editingExecutive ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedExecutive && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Executive Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-600">
                    {selectedExecutive.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{selectedExecutive.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mt-1">
                    {selectedExecutive.position}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Email</div>
                    <div className="text-sm text-slate-900">{selectedExecutive.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Building2 className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Department</div>
                    <div className="text-sm text-slate-900">{selectedExecutive.department}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Year</div>
                    <div className="text-sm text-slate-900">{selectedExecutive.year}</div>
                  </div>
                </div>

                {selectedExecutive.bio && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs font-medium text-slate-500 mb-1">About</div>
                    <div className="text-sm text-slate-900 leading-relaxed">{selectedExecutive.bio}</div>
                  </div>
                )}

                {selectedExecutive.joinDate && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Member Since</div>
                    <div className="text-sm text-slate-900">
                      {new Date(selectedExecutive.joinDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}