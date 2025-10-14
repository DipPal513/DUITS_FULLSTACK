"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import { AlertTriangle, Trash2, UserX } from "lucide-react"

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
            const response = await axios.get('http://localhost:5000/api/v1/auth/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            await axios.patch(`http://localhost:5000/api/v1/auth/users/${selectedUser._id}/role`, {
                role: newRole
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const updated = users.map((user) =>
                user._id === selectedUser._id ? { ...user, role: newRole } : user
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
            await axios.delete(`http://localhost:5000/api/v1/auth/users/${userToDelete._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const updated = users.filter((user) => user._id !== userToDelete._id)
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
        return currentUser?._id === userId || currentUser?.id === userId
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
                                        const isCurrent = isCurrentUser(user._id)
                                        return (
                                            <tr key={user._id} className="hover:bg-slate-50 transition-colors duration-150">
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
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
                        {modalLoading ? (
                            <div className="p-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <div className="space-y-3 w-full">
                                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4 mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b border-slate-200">
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        Confirm Role Change
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-slate-600 mb-4">
                                        Are you sure you want to change <span className="font-semibold text-slate-900">{selectedUser?.name}'s</span> role to:
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200 transition-all duration-200">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-lg font-semibold text-indigo-900">{newRole}</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 flex gap-3 justify-end">
                                    <button
                                        onClick={() => setShowRoleModal(false)}
                                        className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:scale-105 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmRoleChange}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
                                    >
                                        Confirm Change
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
                        {modalLoading ? (
                            <div className="p-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                                    <div className="space-y-3 w-full">
                                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4 mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4 animate-in zoom-in duration-300">
                                        <AlertTriangle className="w-7 h-7 text-red-600" />
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                                        Remove User
                                    </h3>
                                    
                                    <p className="text-slate-600 text-center mb-6">
                                        Are you sure you want to remove{" "}
                                        <span className="font-semibold text-slate-900">{userToDelete.name}</span>?
                                        This action cannot be undone.
                                    </p>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-red-900 mb-1">Warning</h4>
                                                <p className="text-sm text-red-700">
                                                    The user will lose access to the system immediately.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(false)
                                                setUserToDelete(null)
                                            }}
                                            className="flex-1 px-4 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:scale-105 font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirmDelete}
                                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove User
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}