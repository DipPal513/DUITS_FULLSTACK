import { AlertCircle, Loader, Upload, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

 const NoticeFormModal = ({ isOpen, onClose, onSubmit, editingNotice, loading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  console.log("editing notice: ",editingNotice)
  useEffect(() => {
    if (editingNotice) {
      reset({
        title: editingNotice.title,
        description: editingNotice.description,
        deadline: editingNotice.deadline?.split('T')[0],
        registrationLink: editingNotice.registration_link,
        image: editingNotice.image
      });
    } else {
      reset({
        title: '',
        description: '',
        registrationLink: '',
        deadline: '',
        image: ''
      });
    }
  }, [editingNotice, reset]);

  const handleFormSubmit = (data) => {
    

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editingNotice ? 'Edit Notice' : 'Create New Notice'}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Notice Image {!editingNotice && '*'}
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              errors.image ? 'border-red-300 bg-red-50' : 'border-slate-300 hover:border-blue-400'
            }`}>
              <Upload className="mx-auto text-slate-400 mb-3" size={48} />
              <p className="text-slate-700 font-medium mb-1">Upload Notice Image</p>
              <p className="text-sm text-slate-500 mb-4">PNG, JPG, GIF up to 5MB</p>
              <input
                type="file"
                accept="image/*"
                {...register('image', { 
                  required: !editingNotice ? 'Image is required' : false 
                })}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Notice Title *
            </label>
            <input
              type="text"
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.title ? 'border-red-300' : 'border-slate-300'
              }`}
              placeholder="Enter notice title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                errors.description ? 'border-red-300' : 'border-slate-300'
              }`}
              placeholder="Describe your notice"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location & Date Row */}
          <div className="grid grid-cols-1 gap-5">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Deadline *
              </label>
              <input
                type="date"
                {...register('deadline', { required: 'Deadline is required' })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.deadline ? 'border-red-300' : 'border-slate-300'
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Registration Link */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Registration Link *
            </label>
            <input
              type="url"
              {...register('registrationLink', { 
                required: 'Registration link is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL'
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.registrationLink ? 'border-red-300' : 'border-slate-300'
              }`}
              placeholder="https://example.com/register"
            />
            {errors.registrationLink && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.registrationLink.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader className="animate-spin" size={20} />}
              {loading ? 'Saving...' : editingNotice ? 'Update Notice' : 'Create Notice'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeFormModal;