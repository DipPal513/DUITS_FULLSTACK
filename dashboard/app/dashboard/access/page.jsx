"use client"

import DeleteModal from "@/components/access/DeleteModal"
import RoleModal from "@/components/access/RoleModal"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { Trash2, UserX } from "lucide-react"
import { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
export default function MembersPage() {
    const { token, user: currentUser } = useAuth()
    const isAdmin = true
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState("")
    const [userToDelete, setUserToDelete] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`, {
               withCredentials: true,
            })
            setUsers(response.data.users)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users')
            toast.error('Failed to load users')
            console.error('Error loading users:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRoleChangeRequest = (user, role) => {
        if (role === user.role) return // No change needed
        setSelectedUser(user)
        setNewRole(role)
        setShowRoleModal(true)
    }

    const handleConfirmRoleChange = async () => {
        setModalLoading(true)
        const loadingToast = toast.loading('Updating role...')
        
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${selectedUser.id}/role`, {
                role: newRole
            }, {
                withCredentials: true,
            });

            const updated = users.map((user) =>
                user.id === selectedUser.id ? { ...user, role: newRole } : user
            )
            setUsers(updated)
            
            toast.success(`${selectedUser.name}'s role updated to ${newRole}`, {
                id: loadingToast,
                duration: 3000,
                icon: '✅'
            })
            
            setShowRoleModal(false)
        } catch (err) {
            console.error('Error updating user role:', err)
            toast.error(err.response?.data?.message || 'Failed to update user role', {
                id: loadingToast
            })
        } finally {
            setModalLoading(false)
        }
    }

    const handleDeleteRequest = (user) => {
        setUserToDelete(user)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        if (!userToDelete) return
        
        setModalLoading(true)
        const loadingToast = toast.loading('Removing user...')
        
        try {
            // Uncomment and update when you have the delete endpoint
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${userToDelete.id}`, {
                 withCredentials: true
            })
            
            const updated = users.filter((user) => user.id !== userToDelete.id)
            setUsers(updated)
            
            toast.success(`${userToDelete.name} removed successfully`, {
                id: loadingToast,
                icon: '🗑️',
                duration: 3000
            })
            
            setShowDeleteModal(false)
            setUserToDelete(null)
        } catch (err) {
            console.error('Error removing user:', err)
            toast.error(err.response?.data?.message || 'Failed to remove user', {
                id: loadingToast
            })
        } finally {
            setModalLoading(false)
        }
    }

    const isCurrentUser = (userId) => {
        return currentUser?.id === userId || currentUser?.id === userId
    }

    return (
        <DashboardLayout>
            <Toaster position="top-right" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage user roles and permissions</p>
                    </div>
                    <div className="text-sm text-slate-600">
                        Total Users: <span className="font-semibold text-slate-900">{users.length}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-slate-200">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left py-4 px-6 text-xs font-medium text-slate-600 uppercase tracking-wider">User</th>
                                        <th className="text-left py-4 px-6 text-xs font-medium text-slate-600 uppercase tracking-wider">Email</th>
                                        <th className="text-left py-4 px-6 text-xs font-medium text-slate-600 uppercase tracking-wider">Current Role</th>
                                        <th className="text-right py-4 px-6 text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {users.length > 0 ? users.map((user) => {
                                        const isCurrent = isCurrentUser(user.id)
                                        return (
                                            <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                            isCurrent ? 'bg-green-100 ring-2 ring-green-200' : 'bg-indigo-100'
                                                        }`}>
                                                            <span className={`font-semibold text-sm ${
                                                                isCurrent ? 'text-green-700' : 'text-indigo-600'
                                                            }`}>
                                                                {user.name[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-slate-900">{user.name}</span>
                                                            {isCurrent && (
                                                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium animate-in fade-in duration-200">
                                                                    You
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-slate-600">{user.email}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                                        user.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' :
                                                        user.role === 'EDITOR' ? 'bg-green-100 text-green-700' :
                                                        user.role === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-700'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {isAdmin && (
                                                        <div className="flex gap-2 justify-end">
                                                            <select
                                                                value={user.role}
                                                                onChange={(e) => handleRoleChangeRequest(user, e.target.value)}
                                                                disabled={isCurrent}
                                                                className={`px-3 py-1.5 rounded-lg border border-slate-200 text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                                                    isCurrent 
                                                                        ? 'opacity-50 cursor-not-allowed' 
                                                                        : 'cursor-pointer hover:border-indigo-300'
                                                                }`}
                                                            >
                                                                <option value="EDITOR">Editor</option>
                                                                <option value="ADMIN">Admin</option>
                                                                <option value="PENDING">Pending</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleDeleteRequest(user)}
                                                                disabled={isCurrent}
                                                                className={`p-2 rounded-lg transition-all duration-200 ${
                                                                    isCurrent 
                                                                        ? 'text-slate-300 cursor-not-allowed' 
                                                                        : 'text-red-500 hover:bg-red-50 hover:scale-110'
                                                                }`}
                                                                title={isCurrent ? "Cannot delete yourself" : "Remove user"}
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                                        <UserX className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                    <p className="text-slate-500 text-sm">No users found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Role Change Confirmation Modal */}
            {showRoleModal && (
               <RoleModal
                   setShowRoleModal={setShowRoleModal}
                   selectedUser={selectedUser}
                   newRole={newRole}
                   handleConfirmRoleChange={handleConfirmRoleChange}
                   modalLoading={modalLoading}
               />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <DeleteModal
                    setShowDeleteModal={setShowDeleteModal}
                    userToDelete={userToDelete}
                    handleConfirmDelete={handleConfirmDelete}
                    modalLoading={modalLoading}
                    setUserToDelete={setUserToDelete}
                />
            )}
        </DashboardLayout>
    )
}