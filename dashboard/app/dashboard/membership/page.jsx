"use client"

import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { Eye, Search, Trash2, User, X, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function MembershipPage() {
  const isAdmin = true
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")
  const [filterHall, setFilterHall] = useState("")
  const [filterBloodGroup, setFilterBloodGroup] = useState("")
  const { token } = useAuth()
  
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    loadMembers()
  }, [])

  useEffect(() => {
    filterMembers()
  }, [searchTerm, filterDepartment, filterHall, filterBloodGroup, members])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/membership`, {
        withCredentials: true
      })
      setMembers(res.data?.members || res.data.data || [])
      setFilteredMembers(res.data.data?.members || res.data.data || [])
    } catch (error) {
      console.error("Error loading members:", error)
      toast.error("Failed to load members")
    } finally {
      setLoading(false)
    }
  }

  const filterMembers = () => {
    let filtered = [...members]

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobile.includes(searchTerm) ||
        member.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterDepartment) {
      filtered = filtered.filter(member => member.department === filterDepartment)
    }

    if (filterHall) {
      filtered = filtered.filter(member => member.hall === filterHall)
    }

    if (filterBloodGroup) {
      filtered = filtered.filter(member => member.blood_group === filterBloodGroup)
    }

    setFilteredMembers(filtered)
  }

  const handleShowDetails = (member) => {
    setSelectedMember(member)
    setShowDetailsModal(true)
  }

  const confirmDelete = (member) => {
    setMemberToDelete(member)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!memberToDelete) return
    
    setLoading(true)
    const loadingToast = toast.loading("Deleting member...")
    
    try {
      await axios.delete(
        `${baseURL}/membership/${memberToDelete.id}`, 
        { withCredentials: true }
      )
      
      const updatedMembers = members.filter(member => member.id !== memberToDelete.id)
      setMembers(updatedMembers)
      
      toast.success("Member deleted successfully", { id: loadingToast })
      setShowDeleteModal(false)
      setMemberToDelete(null)
    } catch (error) {
      console.error("Error deleting member:", error)
      const errorMessage = error.response?.data?.message || "Failed to delete member"
      toast.error(errorMessage, { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  // Get unique values for filters
  const departments = [...new Set(members.map(m => m.department))].filter(Boolean)
  const halls = [...new Set(members.map(m => m.hall))].filter(Boolean)
  const bloodGroups = [...new Set(members.map(m => m.blood_group))].filter(Boolean)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">DUITS Members</h1>
            <p className="text-slate-500 text-sm mt-1">Manage membership applications</p>
          </div>
          <div className="text-sm text-slate-600">
            Total Members: <span className="font-semibold text-indigo-600">{filteredMembers.length}</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, mobile, transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Hall Filter */}
            <select
              value={filterHall}
              onChange={(e) => setFilterHall(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Halls</option>
              {halls.map(hall => (
                <option key={hall} value={hall}>{hall}</option>
              ))}
            </select>

            {/* Blood Group Filter */}
            <select
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>
        
        {loading && !showDeleteModal ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-slate-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Hall</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Payment Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredMembers.map((member, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate">{member.full_name}</div>
                            <div className="text-sm text-slate-500 truncate">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{member.department}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{member.hall}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          {member.blood_group}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{member.mobile}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.payment_status === 'Successful' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {member.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleShowDetails(member)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => confirmDelete(member)}
                              className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
              <h3 className="text-sm font-medium text-slate-900 mb-1">No members found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete Member</h3>
                <p className="text-sm text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{memberToDelete.full_name}</span>?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setMemberToDelete(null)
                }}
                disabled={loading}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Member Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Full Name</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.full_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Email</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Mobile</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.mobile}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Blood Group</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.blood_group}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Department</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.department}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Hall</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.hall}</p>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Guardian Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Guardian Name</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.guardian_name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Guardian Contact</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.guardian_contact}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-slate-500">Guardian Address</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.guardian_address}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Education</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">SSC Board</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.ssc_board}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">SSC Year</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.ssc_year}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">HSC Board</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.hsc_board}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">HSC Year</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.hsc_year}</p>
                  </div>
                </div>
              </div>

              {/* Activities & Motivation */}
              {(selectedMember.activities || selectedMember.motivation) && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Additional Information</h4>
                  {selectedMember.activities && (
                    <div className="mb-3">
                      <label className="text-xs text-slate-500">Activities</label>
                      <p className="text-sm font-medium text-slate-900">{selectedMember.activities}</p>
                    </div>
                  )}
                  {selectedMember.motivation && (
                    <div>
                      <label className="text-xs text-slate-500">Motivation</label>
                      <p className="text-sm font-medium text-slate-900">{selectedMember.motivation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Transaction ID</label>
                    <p className="text-sm font-medium text-slate-900">{selectedMember.transaction_id}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Amount</label>
                    <p className="text-sm font-medium text-slate-900">৳{selectedMember.payment_amount}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Payment Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedMember.payment_status === 'Successful' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedMember.payment_status}
                    </span>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Registration Date</label>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedMember.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}