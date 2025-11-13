"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/event/DeleteModal";
import EventCard from "@/components/event/EventCard";
import EventFormModal from "@/components/event/EventFormModal";
import axios from 'axios';
import { Calendar, Loader, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;



// Main Dashboard Component
export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });


  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/event`);
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
    
  };

  const handleFormSubmit = async (formData) => {

const base64Image = editingEvent ? editingEvent.image : await convertToBase64(formData.image[0]);

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

      const url = editingEvent 
        ? `${API_URL}/event/${editingEvent.id}` 
        : `${API_URL}/event`;
      
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
         headers: { "Content-Type": "application/json" },
        // send json format data
        body: JSON.stringify(payLoad),
        credentials:"include",
 
      });

      if (!response.ok) throw new Error('Failed to save event');

      const result = await response.json();
      fetchEvents();

      if (editingEvent) {
        setEvents(events.map(event => 
          event.id === editingEvent.id ? result.event : event
        ));
        toast.success('Event updated successfully!');
      } else {
        // setEvents([result.event, ...events]);
        toast.success('Event created successfully!');
      }

      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Failed to save event', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/event/${eventToDelete.id}`, {
       withCredentials: true,
      });

      if (!response.ok) throw new Error('Failed to delete event');

      fetchEvents();
      toast.success('Event deleted successfully!');
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event', 'error');
    } finally {
      setLoading(false);
    }
  };
console.log("all the events here.,", events);
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
              <p className="text-slate-600">Create and manage your events seamlessly</p>
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
          {loading && events.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading events...</p>
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {!loading && events.length === 0 && (
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={handleFormSubmit}
          editingEvent={editingEvent}
          loading={loading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          event={eventToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}