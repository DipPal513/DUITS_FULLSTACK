"use client";

import DashboardLayout from '@/components/DashboardLayout';
import AchievementCard from "@/components/achievement/AchiementCard";
import AchievementFormModal from "@/components/achievement/AchievementFormModal";
import DeleteModal from "@/components/achievement/DeleteModal";
import axios from 'axios';
import { Calendar, Loader, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;



// Main Dashboard Component
export default function AchievementsDashboard() {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [achievementToDelete, setAchievementToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });


  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/achievement`);
      const data = await response.json();
      setAchievements(data.achievements || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to fetch achievements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAchievement = () => {
    setEditingAchievement(null);
    setIsModalOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setIsModalOpen(true);
    
  };

  const handleFormSubmit = async (formData) => {

const base64Image = editingAchievement ? editingAchievement.image : await convertToBase64(formData.image[0]);

      const payLoad = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        location:formData.location,
        date: formData.date,
        registrationLink: formData.registrationLink,
      }

      console.log(`this is the payload`, payLoad);
    try {
      setLoading(true);

      const url = editingAchievement 
        ? `${API_URL}/achievement/${editingAchievement.id}` 
        : `${API_URL}/achievement`;
      
      const method = editingAchievement ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
         headers: { "Content-Type": "application/json" },
        // send json format data
        body: JSON.stringify(payLoad),
        credentials:"include",
 
      });

      if (!response.ok) throw new Error('Failed to save achievement');

      const result = await response.json();
      fetchAchievements();

      if (editingAchievement) {
        setAchievements(achievements.map(achievement => 
          achievement.id === editingAchievement.id ? result.achievement : achievement
        ));
        toast.success('Achievement updated successfully!');
      } else {
        // setAchievements([result.achievement, ...achievements]);
        toast.success('Achievement created successfully!');
      }

      setIsModalOpen(false);
      setEditingAchievement(null);
    } catch (error) {
      console.error('Error submitting achievement:', error);
      toast.error('Failed to save achievement', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (achievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/achievement/${achievementToDelete.id}`, {
       withCredentials: true,
      });

      if (response.status !== 200) toast.error(response.data.message || 'Failed to delete achievement', 'error');

      setAchievements(achievements.filter(achievement => achievement.id !== achievementToDelete.id));
      setIsDeleteModalOpen(false);
      setAchievementToDelete(null);
      toast.success('Achievement deleted successfully!');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error(error.message || 'Failed to delete achievement', 'error');
    } finally {
      setLoading(false);
    }
  };
console.log("all the achievements here.,", achievements);
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
              <p className="text-slate-600">Create and manage your achievements seamlessly</p>
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
          {loading && achievements.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading achievements...</p>
              </div>
            </div>
          )}

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onEdit={handleEditAchievement}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {!loading && achievements.length === 0 && (
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingAchievement(null);
          }}
          onSubmit={handleFormSubmit}
          editingAchievement={editingAchievement}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          achievement={achievementToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setAchievementToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}