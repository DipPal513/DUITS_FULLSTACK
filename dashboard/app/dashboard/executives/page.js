"use client"

import DashboardLayout from "@/components/DashboardLayout"
import DetailsExecutiveModal from "@/components/executive/Details"
import DeleteModal from "@/components/executive/DeleteModal"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { AlertTriangle, Edit2, Eye, Plus, Search, Trash2, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ExecutivePopUp from "@/components/executive/ExecutivePopUp"
import ExecutiveFilter from "@/components/executive/ExecutiveFilter"
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
      setExecutives(res.data.data?.executives)
      setFilteredExecutives(res.data.data?.executives)
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
    const loadingToast = toast.loading("Deleting executive...")
    
    console.log("csrfToken",token);
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

  const positions = ["President", "Vice President", "General Secretary", "Joint General Secretary", "Treasurer","Office Secretary","Publicity and Publication Secretary","External Communication Secretary","Skill Development Secretary","Information and Research Secretary","Event Secretary", "Organizing Secretary", "Design Lead","Junior Executive","General Member"]
 
  const positionOrder = ["President", "Vice President", "General Secretary", "Joint General Secretary", "Treasurer","Office Secretary", "Publicity and Publication Secretary","External Communication Secretary","Skill Development Secretary","Information and Research Secretary","Event Secretary", "Organizing Secretary", "Design Lead","Junior Executive","General Member"]
  
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
       <ExecutiveFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterPosition={filterPosition} positions={positions} setFilterPosition={setFilterPosition} executives={executives} sortedExecutives={sortedExecutives} setFilterDepartment={setFilterDepartment} />
        
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
       <ExecutivePopUp editingExecutive={editingExecutive} setEditingExecutive={setEditingExecutive} loading={loading} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} resetForm={resetForm} positions={positions} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && executiveToDelete && (
        <DeleteModal loading={loading}  executiveToDelete={executiveToDelete} setShowDeleteModal={setShowDeleteModal}setExecutiveToDelete={setExecutiveToDelete} handleDelete={handleDelete}/>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedExecutive && (
        <DetailsExecutiveModal selectedexecutive={selectedExecutive} setShowDetailsModal={setShowDetailsModal} />
      )}
    </DashboardLayout>
  )
}
