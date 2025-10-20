"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/gallery/GalleryModal";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryFormModal from "@/components/gallery/GalleryFormModal";
import { Calendar, Loader, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Main Dashboard Component
export default function GallerysDashboard() {
  const [gallerys, setgallerys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGallerys();
  }, []);

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });


  const fetchGallerys = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setgallerys(data.galleries || []);
    } catch (error) {
      console.error('Error fetching gallerys:', error);
      toast.error('Failed to fetch gallerys', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreategallery = () => {
    setEditingGallery(null);
    setIsModalOpen(true);
  };

  const handleEditgallery = (gallery) => {
    setEditingGallery(gallery);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {

const base64Image = editingGallery ? editingGallery.image : await convertToBase64(formData.image[0]);

      const payLoad = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        category: formData.category,
        date: formData.date,
        
      }

    try {
      setLoading(true);

      const url = editingGallery 
        ? `${API_URL}/gallery/${editingGallery._id}` 
        : `${API_URL}/gallery`;
      
      const method = editingGallery ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
         headers: { "Content-Type": "application/json" },
        // send json format data
        body: JSON.stringify(payLoad),
        credentials:"include",
 
      });

      if (!response.ok) throw new Error('Failed to save gallery');

      const result = await response.json();
      fetchGallerys();

      if (editingGallery) {
        setgallerys(gallerys.map(gallery => 
          gallery._id === editingGallery._id ? result.gallery : gallery
        ));
        toast.success('gallery updated successfully!');
      } else {
        // setGallerys([result.gallery, ...gallerys]);
        toast.success('gallery created successfully!');
      }

      setIsModalOpen(false);
      setEditingGallery(null);
    } catch (error) {
      console.error('Error submitting gallery:', error);
      toast.error('Failed to save gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (gallery) => {
    setGalleryToDelete(gallery);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/gallery/${galleryToDelete._id}`, {
        method: 'DELETE',
        withCredentials: true,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete gallery');

      setgallerys(gallerys.filter(gallery => gallery._id !== galleryToDelete._id));
      toast.success('gallery deleted successfully!');
      setIsDeleteModalOpen(false);
      setGalleryToDelete(null);
    } catch (error) {
      console.error('Error deleting gallery:', error);
      toast.error('Failed to delete gallery', 'error');
    } finally {
      setLoading(false);
    }
  };
console.log("all the gallerys here.,", gallerys);
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
              <p className="text-slate-600">Create and manage your galleries seamlessly</p>
            </div>
            <button
              onClick={handleCreategallery}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create gallery
            </button>
          </div>

          {/* Loading State */}
          {loading && gallerys.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading gallerys...</p>
              </div>
            </div>
          )}

          {/* gallerys Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallerys.map(gallery => (
              <GalleryCard
                key={gallery._id}
                gallery={gallery}
                onEdit={handleEditgallery}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {!loading && gallerys.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                <Calendar size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No gallerys yet</h3>
              <p className="text-slate-600 mb-6">Create your first gallery to get started</p>
              <button
                onClick={handleCreategallery}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <Plus size={20} />
                Create gallery
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <GalleryFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingGallery(null);
          }}
          onSubmit={handleFormSubmit}
          editingGallery={editingGallery}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          gallery={galleryToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setGalleryToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}