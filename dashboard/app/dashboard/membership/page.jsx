"use client"

import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { Eye, Search, Trash2, User, X, Download } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

// ─── PDF Export Utility ──────────────────────────────────────────────────────

const EXPORT_COLUMNS = [
  { key: "full_name",   label: "Full Name" },
  { key: "department",  label: "Department" },
  { key: "hall",        label: "Hall" },
  { key: "email",       label: "Email" },
  { key: "mobile",      label: "Mobile" },
  { key: "blood_group", label: "Blood Group" },
  { key: "hsc_board",   label: "HSC Board" },
  { key: "hsc_year",    label: "HSC Year" },
  { key: "activities",  label: "Activities" },
  { key: "motivation",  label: "Motivation" },
]

async function exportMembersPDF(members) {
  // Dynamically import to avoid SSR issues
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ])

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })

  // ── Header ──
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.setFillColor(67, 56, 202) // indigo-700
  doc.rect(0, 0, pageWidth, 52, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text("DUITS Members List", 40, 32)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}   •   Total: ${members.length}`,
    40,
    46
  )

  // ── Table ──
  const head = [EXPORT_COLUMNS.map((c) => c.label)]
  const body = members.map((m) =>
    EXPORT_COLUMNS.map((c) => {
      const val = m[c.key]
      return val !== undefined && val !== null && val !== "" ? String(val) : "—"
    })
  )

  autoTable(doc, {
    startY: 64,
    head,
    body,
    headStyles: {
      fillColor: [238, 242, 255], // indigo-50
      textColor: [67, 56, 202],   // indigo-700
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],    // slate-800
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],  // slate-50
    },
    columnStyles: {
      0: { cellWidth: 90 },   // full_name
      1: { cellWidth: 70 },   // department
      2: { cellWidth: 65 },   // hall
      3: { cellWidth: 110 },  // email
      4: { cellWidth: 70 },   // mobile
      5: { cellWidth: 50 },   // blood_group
      6: { cellWidth: 60 },   // hsc_board
      7: { cellWidth: 45 },   // hsc_year
      8: { cellWidth: 90 },   // activities
      9: { cellWidth: 90 },   // motivation
    },
    margin: { left: 30, right: 30 },
    tableLineColor: [203, 213, 225], // slate-300
    tableLineWidth: 0.3,
    didDrawPage: (data) => {
      // Footer with page number
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      doc.setTextColor(148, 163, 184) // slate-400
      doc.text(
        `Page ${data.pageNumber} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 12,
        { align: "center" }
      )
    },
  })

  doc.save(`DUITS_Members_${Date.now()}.pdf`)
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MembershipPage() {
  const isAdmin = true
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")
  const [filterHall, setFilterHall] = useState("")
  const [filterBloodGroup, setFilterBloodGroup] = useState("")
  const { token } = useAuth()

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => { loadMembers() }, [])

  useEffect(() => { filterMembers() }, [searchTerm, filterDepartment, filterHall, filterBloodGroup, members])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/membership`, { withCredentials: true })
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
      filtered = filtered.filter(m =>
        m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.mobile.includes(searchTerm) ||
        m.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (filterDepartment) filtered = filtered.filter(m => m.department === filterDepartment)
    if (filterHall)       filtered = filtered.filter(m => m.hall === filterHall)
    if (filterBloodGroup) filtered = filtered.filter(m => m.blood_group === filterBloodGroup)
    setFilteredMembers(filtered)
  }

  const handleExportPDF = async () => {
    if (filteredMembers.length === 0) {
      toast.error("No members to export")
      return
    }
    setExporting(true)
    const t = toast.loading("Generating PDF…")
    try {
      await exportMembersPDF(filteredMembers)
      toast.success("PDF exported successfully", { id: t })
    } catch (err) {
      console.error(err)
      toast.error("Failed to export PDF", { id: t })
    } finally {
      setExporting(false)
    }
  }

  const handleShowDetails = (member) => { setSelectedMember(member); setShowDetailsModal(true) }
  const confirmDelete    = (member) => { setMemberToDelete(member); setShowDeleteModal(true) }

  const handleDelete = async () => {
    if (!memberToDelete) return
    setLoading(true)
    const t = toast.loading("Deleting member…")
    try {
      await axios.delete(`${baseURL}/membership/${memberToDelete.id}`, { withCredentials: true })
      setMembers(prev => prev.filter(m => m.id !== memberToDelete.id))
      toast.success("Member deleted successfully", { id: t })
      setShowDeleteModal(false)
      setMemberToDelete(null)
    } catch (error) {
      console.error("Error deleting member:", error)
      toast.error(error.response?.data?.message || "Failed to delete member", { id: t })
    } finally {
      setLoading(false)
    }
  }

  const departments = [...new Set(members.map(m => m.department))].filter(Boolean)
  const halls        = [...new Set(members.map(m => m.hall))].filter(Boolean)
  const bloodGroups  = [...new Set(members.map(m => m.blood_group))].filter(Boolean)

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">DUITS Members</h1>
            <p className="text-slate-500 text-sm mt-1">Manage membership applications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              Total Members: <span className="font-semibold text-indigo-600">{filteredMembers.length}</span>
            </div>
            {/* Export PDF Button */}
            <button
              onClick={handleExportPDF}
              disabled={exporting || filteredMembers.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting
                ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                : <Download className="w-4 h-4" />
              }
              {exporting ? "Exporting…" : "Export PDF"}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterHall} onChange={(e) => setFilterHall(e.target.value)} className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">All Halls</option>
              {halls.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <select value={filterBloodGroup} onChange={(e) => setFilterBloodGroup(e.target.value)} className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">All Blood Groups</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading && !showDeleteModal ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-slate-200">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent" />
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
                          member.payment_status === "Successful" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {member.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleShowDetails(member)} className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button onClick={() => confirmDelete(member)} className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110" title="Delete">
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

      {/* ── Delete Modal ── */}
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
              <button onClick={() => { setShowDeleteModal(false); setMemberToDelete(null) }} disabled={loading} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Details Modal ── */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Member Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Personal */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[["Full Name", selectedMember.full_name], ["Email", selectedMember.email], ["Mobile", selectedMember.mobile], ["Blood Group", selectedMember.blood_group], ["Department", selectedMember.department], ["Hall", selectedMember.hall]].map(([label, val]) => (
                    <div key={label}><label className="text-xs text-slate-500">{label}</label><p className="text-sm font-medium text-slate-900">{val}</p></div>
                  ))}
                </div>
              </div>
              {/* Guardian */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Guardian Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-slate-500">Guardian Name</label><p className="text-sm font-medium text-slate-900">{selectedMember.guardian_name}</p></div>
                  <div><label className="text-xs text-slate-500">Guardian Contact</label><p className="text-sm font-medium text-slate-900">{selectedMember.guardian_contact}</p></div>
                  <div className="col-span-2"><label className="text-xs text-slate-500">Guardian Address</label><p className="text-sm font-medium text-slate-900">{selectedMember.guardian_address}</p></div>
                </div>
              </div>
              {/* Education */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Education</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[["SSC Board", selectedMember.ssc_board], ["SSC Year", selectedMember.ssc_year], ["HSC Board", selectedMember.hsc_board], ["HSC Year", selectedMember.hsc_year]].map(([label, val]) => (
                    <div key={label}><label className="text-xs text-slate-500">{label}</label><p className="text-sm font-medium text-slate-900">{val}</p></div>
                  ))}
                </div>
              </div>
              {/* Activities & Motivation */}
              {(selectedMember.activities || selectedMember.motivation) && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Additional Information</h4>
                  {selectedMember.activities && <div className="mb-3"><label className="text-xs text-slate-500">Activities</label><p className="text-sm font-medium text-slate-900">{selectedMember.activities}</p></div>}
                  {selectedMember.motivation && <div><label className="text-xs text-slate-500">Motivation</label><p className="text-sm font-medium text-slate-900">{selectedMember.motivation}</p></div>}
                </div>
              )}
              {/* Payment */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-slate-500">Transaction ID</label><p className="text-sm font-medium text-slate-900">{selectedMember.transaction_id}</p></div>
                  <div><label className="text-xs text-slate-500">Amount</label><p className="text-sm font-medium text-slate-900">৳{selectedMember.payment_amount}</p></div>
                  <div>
                    <label className="text-xs text-slate-500">Payment Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedMember.payment_status === "Successful" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {selectedMember.payment_status}
                    </span>
                  </div>
                  <div><label className="text-xs text-slate-500">Registration Date</label><p className="text-sm font-medium text-slate-900">{new Date(selectedMember.created_at).toLocaleDateString()}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}