"use client";

import DashboardLayout from '@/components/DashboardLayout';
import DeleteModal from "@/components/event/DeleteModal"; 
import BlogCard from "@/components/blog/BlogCard"; 

import { usePagination, PaginationControls } from '@/hook/usePagination';
import axios from 'axios';
import { Loader, Plus, BookOpen } from 'lucide-react'; 
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // 1. Import Router

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ITEMS_PER_PAGE = 10;

export default function BlogsDashboard() {
  const router = useRouter(); // 2. Initialize Router
  const [blogs, setBlogs] = useState([]);
  
  // Modal state only needed for DELETE now
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const pagination = usePagination(totalBlogs, ITEMS_PER_PAGE);

  // Fetch blogs with pagination
  const fetchBlogs = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
    try {
      setLoading(true);
      const url = `${API_URL}/blog?page=${page}&limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
    
      setBlogs(response?.data?.data?.blogs || []);
      setTotalBlogs(response?.data?.data?.totalCount || response?.data?.data?.blogs?.length || 0);
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(pagination.currentPage, ITEMS_PER_PAGE);
  }, [pagination.currentPage, fetchBlogs]);


  // 3. Handle Create Navigation
  const handleCreateBlog = () => {
    // Navigate to empty form
    router.push('/createblog');
  };

  // 4. Handle Edit Navigation
  const handleEditBlog = (blog) => {
    // Navigate to form with ID in query params
    // Example URL: /createblog?id=654321
    router.push(`/createblog?id=${blog.id || blog._id}`);
  };

  // Delete Logic (Remains the same)
  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/blog/${blogToDelete.id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response.data.message || 'Failed to delete blog');
        return;
      }

      toast.success('Blog deleted successfully!');
      closeDeleteModal();
      
      if (blogs.length === 1 && pagination.currentPage > 1) {
        pagination.goToPrevious();
      } else {
        fetchBlogs(pagination.currentPage, ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error(error.message || 'Failed to delete blog');
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
                Blog Management
              </h1>
              <p className="text-slate-600">
                Create and manage your articles
                {totalBlogs > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({totalBlogs} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleCreateBlog}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus size={20} />
              Create Article
            </button>
          </div>

          {/* Loading & Grid Section */}
          {loading && blogs.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                <p className="text-slate-600">Loading articles...</p>
              </div>
            </div>
          ) : blogs.length > 0 ? (
            <>
              {/* Blogs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog.id || blog._id}
                    blog={blog}
                    onEdit={() => handleEditBlog(blog)} 
                    onDelete={() => handleDeleteClick(blog)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalBlogs > 0 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={totalBlogs}
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
                <BookOpen size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No blogs yet</h3>
              <p className="text-slate-600 mb-6">Write your first article to get started</p>
              <button
                onClick={handleCreateBlog}
                className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                <Plus size={20} />
                Create Article
              </button>
            </div>
          )}
        </div>

        {/* Delete Modal (Still needed) */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          item={blogToDelete}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          loading={loading}
          title="Delete Blog Post"
          message="Are you sure you want to delete this blog post? This action cannot be undone."
        />
      </div>
    </DashboardLayout>
  );
}