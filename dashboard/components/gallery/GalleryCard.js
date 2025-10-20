
import { Calendar, Edit, Trash2 } from 'lucide-react';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const galleryCard = ({ gallery, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={gallery?.image}
          alt={gallery.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onEdit(gallery)}
            className="bg-white/95 backdrop-blur-sm p-2.5 cursor-pointer rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
          >
            <Edit size={18} className="text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(gallery)}
            className="bg-white/95 backdrop-blur-sm p-2.5 cursor-pointer rounded-lg shadow-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
          {gallery.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {gallery.description}
        </p>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-slate-700">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Calendar size={16} className="text-purple-600" />
            </div>
            <span className="text-sm font-medium">{formatDate(gallery.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default galleryCard;