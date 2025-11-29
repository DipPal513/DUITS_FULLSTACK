"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/notice/DeleteModal";
import NoticeCard from "@/components/notice/NoticeCard";
import NoticeFormModal from "@/components/notice/NoticeFormModal";
import { usePagination, PaginationControls } from '@/hook/usePagination';
import axios from 'axios';
import { Calendar, Loader, Plus } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ITEMS_PER_PAGE = 10;

// Utility function to convert file to base64
const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export default function NoticesDashboard() {
  const [notices, setNotices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalNotices, setTotalNotices] = useState(0);

  // Initialize pagination hook AFTER state declaration
  const pagination = usePagination(totalNotices, ITEMS_PER_PAGE);

  // Fetch notices with pagination
  const fetchNotices = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
    try {
      setLoading(true);
      const url = `${API_URL}/notice?page=${page}&limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      
      const data = response?.data?.data;
      setNotices(data?.notices || []);
      setTotalNotices(data?.totalCount || 0);
      console.log('API Response:', { notices: data?.notices?.length, total: data?.total, totalPages: data?.totalPages });
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices(pagination.currentPage, ITEMS_PER_PAGE);
  }, [pagination.currentPage, fetchNotices]);

  // Modal handlers
  const handleCreateNotice = () => {
    setEditingNotice(null);
    setIsModalOpen(true);
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
  };

  // Form submission handler
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);

      const base64Image = editingNotice?.image || await convertToBase64(formData.image[0]);

      const payload = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        location: formData.location,
        deadline: formData.deadline,
        registrationLink: formData.registrationLink,
      };

      const url = editingNotice 
        ? `${API_URL}/notice/${editingNotice.id}` 
        : `${API_URL}/notice`;
      
      const method = editingNotice ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) throw new Error('Failed to save notice');

      toast.success(editingNotice ? 'Notice updated successfully!' : 'Notice created successfully!');
      closeModal();
      fetchNotices(pagination.currentPage, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error submitting notice:', error);
      toast.error('Failed to save notice');
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const handleDeleteClick = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoticeToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/notice/${noticeToDelete.id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response.data.message || 'Failed to delete notice');
        return;
      }

      toast.success('Notice deleted successfully!');
      closeDeleteModal();
      
      // If we deleted the last item on a page, go back one page
      if (notices.length === 1 && pagination.currentPage > 1) {
        pagination.goToPrevious();
      } else {
        fetchNotices(pagination.currentPage, ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error(error.message || 'Failed to delete notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Notices Management
              </h1>
              <p className="text-slate-600">
                Create and manage your notices seamlessly
                {totalNotices > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({totalNotices} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleCreateNotice}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Notice
            </button>
          </div>

          {loading && notices.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading notices...</p>
              </div>
            </div>
          ) : notices.length > 0 ? (
            <>
              {/* Notices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {notices?.map((notice) => (
                  <NoticeCard
                    key={notice?.id}
                    notice={notice}
                    onEdit={handleEditNotice}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

             
              {totalNotices > 0 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={totalNotices}
                  onPageChange={pagination.goToPage}
                  canGoPrevious={pagination.canGoPrevious}
                  canGoNext={pagination.canGoNext}
                  onPrevious={pagination.goToPrevious}
                  onNext={pagination.goToNext}
                  onFirst={pagination.goToFirst}
                  onLast={pagination.goToLast}
                  showFirstLast={true}
                  showInfo={true}
                />
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                <Calendar size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No notices yet</h3>
              <p className="text-slate-600 mb-6">Create your first notice to get started</p>
              <button
                onClick={handleCreateNotice}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                <Plus size={20} />
                Create Notice
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <NoticeFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          editingNotice={editingNotice}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          notice={noticeToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}