"use client"

import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { AlertTriangle, Edit2, Eye, Mail, Plus, Search, Trash2, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import DetailsExecutiveModal from "@/components/executive/Details"
export default function ExecutivesPage() {

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  const isAdmin = true
  const [executives, setExecutives] = useState([])
  const [filteredExecutives, setFilteredExecutives] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState(null)
  const [selectedExecutive, setSelectedExecutive] = useState(null)
  const [executiveToDelete, setExecutiveToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPosition, setFilterPosition] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")
  const { token } = useAuth()
  
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    session: "",
    phone: "",
    image: null,
    duits_batch:""
  })

  useEffect(() => {
    loadExecutives()
  }, [])

  useEffect(() => {
    filterExecutives()
  }, [searchTerm, filterPosition, filterDepartment, executives])

  const loadExecutives = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/executive`, {
        withCredentials:true
      })
      setExecutives(res.data.data)
      setFilteredExecutives(res.data.data)
    } catch (error) {
      console.error("Error loading executives:", error)
      toast.error("Failed to load executives")
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
    
    // Validate form
    if (!formData.name || !formData.email || !formData.position || !formData.department || !formData.session) {
      toast.error("Please fill in all required fields")
      return
    }
    const base64Image = editingExecutive ? editingExecutive?.image : await convertToBase64(formData.image);
    setLoading(true)
    const loadingToast = toast.loading(editingExecutive ? "Updating executive?..." : "Adding executive?...")
    const payLoad = {
      name: formData.name,
      email: formData.email,
      position: formData.position,
      department: formData.department,
      session: formData.session,
      image: base64Image,
      phone: formData.phone,
      year: formData.year,
      duits_batch:formData.duits_batch
    }
    try {
      if (editingExecutive) {
        // Update existing executive
        const res = await axios.put(
          `${baseURL}/executive/${editingExecutive?.id}`, 
          payLoad, 
          {withCredentials:true}
        )
        const updatedExecs = executives.map(exec => 
          exec.id === editingExecutive?.id ? res.data.data : exec
        )
        loadExecutives();
        toast.success("Executive updated successfully", { id: loadingToast })
      } else {
        // Add new executive
        const res = await axios.post(
          `${baseURL}/executive`, 
          payLoad, 
          {withCredentials:true,credentials:"include"}
        )
        setExecutives([res.data.data, ...executives])
        toast.success("Executive added successfully", { id: loadingToast })
      }
      resetForm()
    } catch (error) {
      console.error("Error saving executive:", error)
      const errorMessage = error.response?.data?.message || "Failed to save executive"
      toast.error(errorMessage, { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (executive) => {
    setLoading(true)
   
    try {
      // Fetch fresh data from API
      const res = await axios.get(
        `${baseURL}/executive/${executive?.id}`,
        {withCredentials:true}
      )
      
      const executiveData = res.data.data
      
      setEditingExecutive(executiveData)
      setFormData({
        name: executiveData.name || "",
        email: executiveData.email || "",
        position: executiveData.position || "",
        department: executiveData.department || "",
        session: executiveData.session || "",
        phone: executiveData.phone || "",
        image: executiveData.image || null,
        year: executiveData.year || "",
        duits_batch: executiveData.duits_batch || ""
      })
      
      // toast.success("Executive loaded", { id: loadingToast })
      setShowModal(true)
    } catch (error) {
      console.error("Error loading executive:", error)
      toast.error("Failed to load executive details", { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (executive) => {
    setExecutiveToDelete(executive)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!executiveToDelete) return
    
    setLoading(true)
    const loadingToast = toast.loading("Deleting executive?...")
    
    try {
      await axios.delete(
        `${baseURL}/executive/${executiveToDelete.id}`, 
        { withCredentials:true }
      )
      
      const updatedExecs = executives.filter(exec => exec.id !== executiveToDelete.id)
      setExecutives(updatedExecs)
      
      toast.success("Executive deleted successfully", { id: loadingToast })
      setShowDeleteModal(false)
      setExecutiveToDelete(null)
    } catch (error) {
      console.error("Error deleting executive:", error)
      const errorMessage = error.response?.data?.message || "Failed to delete executive"
      toast.error(errorMessage, { id: loadingToast })
    } finally {
      setLoading(false)
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
      session: "",
      image: null,
      duits_batch:""
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
      session: "",
      duits_batch:""
      
    })
    setShowModal(true)
  }

  const positions = ["President", "Vice President", "Secretary", "Treasurer", "Technical Lead", "Event Coordinator", "Marketing Head", "Design Lead","Junior Executive"]
 
  const positionOrder = ["President", "Vice President", "Secretary", "Treasurer", "Technical Lead", "Event Coordinator", "Marketing Head", "Junior Executive"]
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
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-lg transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Add Executive
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search executives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
           
          </div>
          {(searchTerm || filterPosition ) && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs animate-in fade-in duration-200">
              <span className="text-slate-600">
                Showing {sortedExecutives.length} of {executives.length} executives
              </span>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterPosition("")
                  setFilterDepartment("")
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        
        {loading && !showModal && !showDeleteModal ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-slate-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : sortedExecutives.length > 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Executive</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sortedExecutives?.map((executive,index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110">
                           <img src={executive?.image} alt={executive?.name} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate">{executive?.name}</div>
                            <div className="text-sm text-slate-500 truncate">{executive?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          {executive?.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{executive?.department}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{executive?.session}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{executive?.year}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleShowDetails(executive)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => handleEdit(executive)}
                                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => confirmDelete(executive)}
                                className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
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
          <div className="bg-white rounded-lg border border-slate-200 py-12 transition-all duration-200">
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingExecutive ? "Edit Executive" : "Add Executive"}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-slate-100 rounded transition-all duration-200 hover:scale-110"
                disabled={loading}
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Photo 
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={loading}
                  />
           
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="john.doe@example.com"
                    disabled={loading}
                  />
                </div>
<div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="123-456-7890"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={loading}
                  >
                    <option value="">Select Position</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Computer Science"
                    disabled={loading}
                  />
                </div>
    <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="2026"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Session <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={loading}
                  >
                    <option value="">Select Session</option>
                    <option value="2020-2021">2018-2019</option>
                    <option value="2020-2021">2019-2020</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2025-2026">2026-2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    DUITS batch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.duits_batch}
                    onChange={(e) => setFormData({ ...formData, duits_batch: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="11"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingExecutive ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    editingExecutive ? "Update Executive" : "Add Executive"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && executiveToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
                Delete Executive
              </h3>
              
              <p className="text-sm text-slate-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-900">{executiveToDelete.name}</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setExecutiveToDelete(null)
                  }}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedExecutive && (
        <DetailsExecutiveModal selectedexecutive={selectedExecutive} setShowDetailsModal={setShowDetailsModal} />
      )}
    </DashboardLayout>
  )
}
