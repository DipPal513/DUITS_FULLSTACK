"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"
export default function MembersPage() {
    // const { isAdmin } = useAuth()
    const isAdmin = true;
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadUsers = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get('http://localhost:5000/api/v1/auth/users')
            setUsers(response.data.users)
            console.log(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load users')
            console.error('Error loading users:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/v1/auth/users/${userId}/role`, {
                role: newStatus
            });
            
            const updated = users.map((user) =>
                user.id === userId ? { ...user, role: newStatus } : user
            );
            setUsers(updated);
        } catch (err) {
            console.error('Error updating user role:', err);
            setError(err.response?.data?.message || 'Failed to update user role');
        }
    }

    const handleRemove = (userId) => {
        if (confirm("Are you sure you want to remove this user?")) {
            const updated = users.filter((user) => user.id !== userId)
            storage.set(STORAGE_KEYS.MEMBERS, updated)
            setUsers(updated)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Users Management</h1>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="text-left py-4 px-6">User</th>
                                <th className="text-left py-4 px-6">Email</th>
                                <th className="text-left py-4 px-6">Current Role</th>
                                <th className="text-right py-4 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? users?.map((user) => (
                                <tr key={user.id} className="border-b border-border">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-medium">{user.name[0]}</span>
                                            </div>
                                            <span>{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            user.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                                            user.role === 'Editor' ? 'bg-green-100 text-green-700' :
                                            user.role === 'Suspended' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {isAdmin && (
                                            <div className="flex gap-2 justify-end">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                    className="px-3 py-1 rounded-lg border bg-background"
                                                >
                                                   
                                                    <option value="EDITOR">Editor</option>
                                                    <option value="ADMIN">Admin</option>
                                                    <option value="PENDING">Pending</option>
                                                </select>
                                                <button
                                                    onClick={() => handleRemove(user.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )): 'No users found'}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
