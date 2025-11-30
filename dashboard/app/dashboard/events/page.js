"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/event/DeleteModal";
import EventCard from "@/components/event/EventCard";
import EventFormModal from "@/components/event/EventFormModal";
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
export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);

  // Initialize pagination hook
  const pagination = usePagination(totalEvents, ITEMS_PER_PAGE);

  // Fetch events with pagination
  const fetchEvents = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
    try {
      setLoading(true);
      const url = `${API_URL}/event?page=${page}&limit=${limit}`;
      const response = await axios.get(url,{withCredentials: true});
    
      
      setEvents(response?.data?.data?.events || []);
      console.log(response.data?.data)
      setTotalEvents(response?.data?.data?.totalCount || response?.data?.data?.events?.length || 0);
      
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(pagination.currentPage, ITEMS_PER_PAGE);
  }, [pagination.currentPage, fetchEvents]);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);

      const base64Image = editingEvent?.image || await convertToBase64(formData.image[0]);

      const payload = {
        title: formData.title,
        description: formData.description,
        image: base64Image,
        location: formData.location,
        date: formData.date,
        registrationLink: formData.registrationLink,
      };

     
      const url = editingEvent 
        ? `${API_URL}/event/${editingEvent.id}` 
        : `${API_URL}/event`;
      
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) throw new Error('Failed to save event');

      toast.success(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      closeModal();
      fetchEvents(pagination.currentPage, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/event/${eventToDelete.id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response.data.message || 'Failed to delete event');
        return;
      }

      toast.success('Event deleted successfully!');
      closeDeleteModal();
      
      // If we deleted the last item on a page, go back one page
      if (events.length === 1 && pagination.currentPage > 1) {
        pagination.goToPrevious();
      } else {
        fetchEvents(pagination.currentPage, ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.message || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  console.log("Pagination Debug:", { 
    currentPage: pagination.currentPage, 
    totalPages: pagination.totalPages,
    totalEvents,
    events: events.length 
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Events Management
              </h1>
              <p className="text-slate-600">
                Create and manage your events seamlessly
                {totalEvents > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({totalEvents} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleCreateEvent}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Event
            </button>
          </div>

          {/* Loading State */}
          {loading && events.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading events...</p>
              </div>
            </div>
          ) : events.length > 0 ? (
            <>
              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalEvents > 0 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={totalEvents}
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
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No events yet</h3>
              <p className="text-slate-600 mb-6">Create your first event to get started</p>
              <button
                onClick={handleCreateEvent}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <Plus size={20} />
                Create Event
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <EventFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          editingEvent={editingEvent}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          event={eventToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}