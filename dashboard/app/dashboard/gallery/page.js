"use client";

import DashboardLayout from '@/components/DashboardLayout';
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryFormModal from "@/components/gallery/GalleryFormModal";
import DeleteModal from "@/components/gallery/GalleryModal";
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
export default function GallerysDashboard() {
  const [galleries, setGalleries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalGalleries, setTotalGalleries] = useState(0);

  // Initialize pagination hook
  const pagination = usePagination(totalGalleries, ITEMS_PER_PAGE);

  // Fetch galleries with pagination
  const fetchGalleries = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
    try {
      setLoading(true);
      const url = `${API_URL}/gallery?page=${page}&limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      const data = response?.data?.data;
      
      setGalleries(data?.galleries || []);
      setTotalGalleries(data?.totalCount || data?.galleries?.length || 0);

    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Failed to fetch galleries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleries(pagination.currentPage, ITEMS_PER_PAGE);
  }, [pagination.currentPage, fetchGalleries]);

  const handleCreateGallery = () => {
    setEditingGallery(null);
    setIsModalOpen(true);
  };

  const handleEditGallery = (gallery) => {
    setEditingGallery(gallery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGallery(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);

      const base64Image = editingGallery?.image || await convertToBase64(formData.image[0]);

      const payload = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        category: formData.category,
        date: formData.date,
      };

      const url = editingGallery 
        ? `${API_URL}/gallery/${editingGallery.id}` 
        : `${API_URL}/gallery`;
      
      const method = editingGallery ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) throw new Error('Failed to save gallery');

      toast.success(editingGallery ? 'Gallery updated successfully!' : 'Gallery created successfully!');
      closeModal();
      fetchGalleries(pagination.currentPage, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error submitting gallery:', error);
      toast.error('Failed to save gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (gallery) => {
    setGalleryToDelete(gallery);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGalleryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/gallery/${galleryToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete gallery');

      toast.success('Gallery deleted successfully!');
      closeDeleteModal();
      
      // If we deleted the last item on a page, go back one page
      if (galleries.length === 1 && pagination.currentPage > 1) {
        pagination.goToPrevious();
      } else {
        fetchGalleries(pagination.currentPage, ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error deleting gallery:', error);
      toast.error('Failed to delete gallery');
    } finally {
      setLoading(false);
    }
  };

  console.log("Pagination Debug:", { 
    currentPage: pagination.currentPage, 
    totalPages: pagination.totalPages,
    totalGalleries,
    galleries: galleries.length 
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Gallery Management
              </h1>
              <p className="text-slate-600">
                Create and manage your galleries seamlessly
                {totalGalleries > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({totalGalleries} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleCreateGallery}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Gallery
            </button>
          </div>

          {/* Loading State */}
          {loading && galleries.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading galleries...</p>
              </div>
            </div>
          ) : galleries.length > 0 ? (
            <>
              {/* Galleries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {galleries.map((gallery) => (
                  <GalleryCard
                    key={gallery.id}
                    gallery={gallery}
                    onEdit={handleEditGallery}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalGalleries > 0 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={totalGalleries}
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
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No galleries yet</h3>
              <p className="text-slate-600 mb-6">Create your first gallery to get started</p>
              <button
                onClick={handleCreateGallery}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <Plus size={20} />
                Create Gallery
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <GalleryFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          editingGallery={editingGallery}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          gallery={galleryToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}