"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/notice/DeleteModal";
import NoticeCard from "@/components/notice/NoticeCard";
import NoticeFormModal from "@/components/notice/NoticeFormModal";
import axios from 'axios';
import { Calendar, Loader, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;



// Main Dashboard Component
export default function NoticesDashboard() {
  const [notices, setNotices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });


  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/notice`);
      const data = await response.json();
      setNotices(data.notices || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to fetch notices', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = () => {
    setEditingNotice(null);
    setIsModalOpen(true);
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setIsModalOpen(true);
    
  };

  const handleFormSubmit = async (formData) => {

const base64Image = editingNotice ? editingNotice.image : await convertToBase64(formData.image[0]);

      const payLoad = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        location:formData.location,
        deadline: formData.deadline,
        registrationLink: formData.registrationLink,
      }

      console.log(`this is the payload`, payLoad);
    try {
      setLoading(true);

      const url = editingNotice 
        ? `${API_URL}/notice/${editingNotice._id}` 
        : `${API_URL}/notice`;
      
      const method = editingNotice ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
         headers: { "Content-Type": "application/json" },
        // send json format data
        body: JSON.stringify(payLoad),
        credentials:"include",
 
      });

      if (!response.ok) throw new Error('Failed to save notice');

      const result = await response.json();
      fetchNotices();

      if (editingNotice) {
        setNotices(notices.map(notice => 
          notice._id === editingNotice._id ? result.notice : notice
        ));
        toast.success('Notice updated successfully!');
      } else {
        // setNotices([result.notice, ...notices]);
        toast.success('Notice created successfully!');
      }

      setIsModalOpen(false);
      setEditingNotice(null);
    } catch (error) {
      console.error('Error submitting notice:', error);
      toast.error('Failed to save notice', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/notice/${noticeToDelete._id}`, {
       withCredentials: true,
      });

      if (response.status !== 200) toast.error(response.data.message || 'Failed to delete notice', 'error');

      setNotices(notices.filter(notice => notice._id !== noticeToDelete._id));
      setIsDeleteModalOpen(false);
      setNoticeToDelete(null);
      toast.success('Notice deleted successfully!');
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error(error.message || 'Failed to delete notice', 'error');
    } finally {
      setLoading(false);
    }
  };
console.log("all the notices here.,", notices);
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
              <p className="text-slate-600">Create and manage your notices seamlessly</p>
            </div>
            <button
              onClick={handleCreateNotice}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Notice
            </button>
          </div>

          {/* Loading State */}
          {loading && notices.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading notices...</p>
              </div>
            </div>
          )}

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map(notice => (
              <NoticeCard
                key={notice._id}
                notice={notice}
                onEdit={handleEditNotice}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {!loading && notices.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                <Calendar size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No notices yet</h3>
              <p className="text-slate-600 mb-6">Create your first notice to get started</p>
              <button
                onClick={handleCreateNotice}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingNotice(null);
          }}
          onSubmit={handleFormSubmit}
          editingNotice={editingNotice}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          notice={noticeToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setNoticeToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}