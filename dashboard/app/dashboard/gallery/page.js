"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
// import { storage, STORAGE_KEYS } from "@/lib/storage"
import { useAuth } from "@/contexts/AuthContext"

export default function GalleryPage() {
  const { isAdmin } = useAuth()
  const [gallery, setGallery] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filterCategory, setFilterCategory] = useState("All")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Event",
    date: "",
    imageUrl: "",
  })

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = () => {
    const data =  [ {title: "", description:"something good", category:"Event", date:"2023-10-10", imageUrl:"/hackathon-team-coding.jpg", id: "1"}, {title: "Web Dev Workshop", description:"learn web dev", category:"Workshop", date:"2023-09-15", imageUrl:"/workshop-presentation-tech.jpg", id: "2"}]
    setGallery(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingItem) {
      // Update existing item
      const updated = gallery.map((item) => (item.id === editingItem.id ? { ...formData, id: item.id } : item))
      storage.set(STORAGE_KEYS.GALLERY, updated)
      setGallery(updated)
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now().toString(),
        uploadDate: new Date().toISOString().split("T")[0],
      }
      const updated = [...gallery, newItem]
      storage.set(STORAGE_KEYS.GALLERY, updated)
      setGallery(updated)
    }

    resetForm()
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      date: item.date,
      imageUrl: item.imageUrl,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updated = gallery.filter((item) => item.id !== id)
      storage.set(STORAGE_KEYS.GALLERY, updated)
      setGallery(updated)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Event",
      date: "",
      imageUrl: "",
    })
    setEditingItem(null)
    setShowModal(false)
  }

  const filteredGallery = gallery.filter((item) => {
    return filterCategory === "All" || item.category === filterCategory
  })

  const sortedGallery = [...filteredGallery].sort((a, b) => new Date(b.date) - new Date(a.date))

  const getCategoryColor = (category) => {
    const colors = {
      Event: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Workshop: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Team: "bg-green-500/10 text-green-500 border-green-500/20",
      Achievement: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      Other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    }
    return colors[category] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
            <p className="text-muted-foreground mt-1">Browse and manage club photos</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Photo
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="bg-card border border-border rounded-xl p-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>All</option>
            <option>Event</option>
            <option>Workshop</option>
            <option>Team</option>
            <option>Achievement</option>
            <option>Other</option>
          </select>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGallery.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={item.imageUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground line-clamp-1">{item.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                {isAdmin && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(item)
                      }}
                      className="flex-1 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                      className="flex-1 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {sortedGallery.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No photos yet</h3>
            <p className="text-muted-foreground">Upload your first photo to get started</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md my-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingItem ? "Edit Photo" : "Upload New Photo"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg (optional - placeholder will be used)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave empty to use a placeholder image</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Event">Event</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Team">Team</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  {editingItem ? "Update" : "Upload"} Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <img
                src={
                  selectedImage.imageUrl ||
                  `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(selectedImage.title) || "/placeholder.svg"}`
                }
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-muted"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-foreground">{selectedImage.title}</h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-muted-foreground mb-4">{selectedImage.description}</p>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium border ${getCategoryColor(selectedImage.category)}`}
                  >
                    {selectedImage.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
