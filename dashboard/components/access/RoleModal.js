import React from 'react'

export default function RoleModal({ setShowRoleModal, selectedUser, newRole, handleConfirmRoleChange, modalLoading }) {
  return (
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
  )
}
