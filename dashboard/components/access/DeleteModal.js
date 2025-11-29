import React from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
export default function DeleteModal({ setShowDeleteModal, userToDelete, handleConfirmDelete, modalLoading, setUserToDelete }) {
  return (
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
  )
}
