"use client";

import DashboardLayout from '@/components/DashboardLayout';
import AchievementCard from "@/components/achievement/AchiementCard";
import AchievementFormModal from "@/components/achievement/AchievementFormModal";
import DeleteModal from "@/components/achievement/DeleteModal";
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

// Main Dashboard Component
export default function AchievementsDashboard() {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [achievementToDelete, setAchievementToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalAchievements, setTotalAchievements] = useState(0);

  // Initialize pagination hook
  const pagination = usePagination(totalAchievements, ITEMS_PER_PAGE);

  // Fetch achievements with pagination
  const fetchAchievements = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
    try {
      setLoading(true);
      const url = `${API_URL}/achievement?page=${page}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      
      setAchievements(data?.data?.achievements || []);
      setTotalAchievements(data?.totalCount || data?.data?.achievements?.length || 0);
      
     
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements(pagination.currentPage, ITEMS_PER_PAGE);
  }, [pagination.currentPage, fetchAchievements]);

  const handleCreateAchievement = () => {
    setEditingAchievement(null);
    setIsModalOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAchievement(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);

      const base64Image = editingAchievement?.image || await convertToBase64(formData.image[0]);

      const payload = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        location: formData.location,
        date: formData.date,
        registrationLink: formData.registrationLink,
      };

      console.log('Payload:', payload);

      const url = editingAchievement 
        ? `${API_URL}/achievement/${editingAchievement.id}` 
        : `${API_URL}/achievement`;
      
      const method = editingAchievement ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) throw new Error('Failed to save achievement');

      toast.success(editingAchievement ? 'Achievement updated successfully!' : 'Achievement created successfully!');
      closeModal();
      fetchAchievements(pagination.currentPage, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error submitting achievement:', error);
      toast.error('Failed to save achievement');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (achievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAchievementToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/achievement/${achievementToDelete.id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response.data.message || 'Failed to delete achievement');
        return;
      }

      toast.success('Achievement deleted successfully!');
      closeDeleteModal();
      
      // If we deleted the last item on a page, go back one page
      if (achievements.length === 1 && pagination.currentPage > 1) {
        pagination.goToPrevious();
      } else {
        fetchAchievements(pagination.currentPage, ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error(error.message || 'Failed to delete achievement');
    } finally {
      setLoading(false);
    }
  };

  console.log("Pagination Debug:", { 
    currentPage: pagination.currentPage, 
    totalPages: pagination.totalPages,
    totalAchievements,
    achievements: achievements.length 
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Achievements Management
              </h1>
              <p className="text-slate-600">
                Create and manage your achievements seamlessly
                {totalAchievements > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({totalAchievements} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleCreateAchievement}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Achievement
            </button>
          </div>

          {/* Loading State */}
          {loading && achievements.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading achievements...</p>
              </div>
            </div>
          ) : achievements.length > 0 ? (
            <>
              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onEdit={handleEditAchievement}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalAchievements > 0 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={totalAchievements}
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
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No achievements yet</h3>
              <p className="text-slate-600 mb-6">Create your first achievement to get started</p>
              <button
                onClick={handleCreateAchievement}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <Plus size={20} />
                Create Achievement
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <AchievementFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          editingAchievement={editingAchievement}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          achievement={achievementToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}