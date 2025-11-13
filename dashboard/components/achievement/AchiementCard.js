import { Calendar, Edit, ExternalLink, Trash2, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AchievementCard = ({ achievement, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-slate-800">
        <img
          src={achievement?.image}
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
            Active
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit(achievement);
            }}
            className="bg-slate-900/90 backdrop-blur-sm p-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            aria-label="Edit achievement"
          >
            <Edit size={16} className="text-white" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(achievement);
            }}
            className="bg-slate-900/90 backdrop-blur-sm p-2.5 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            aria-label="Delete achievement"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Calendar size={14} />
            <span className="font-medium">{formatDate(achievement.date)}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
          {achievement.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {achievement.description}
        </p>

        {/* Info Row */}
        <div className="flex items-center gap-3 pt-2">
          {/* Deadline Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
            <Calendar size={14} className="text-purple-400" />
            <span className="text-xs text-slate-300 font-medium">
              {formatDate(achievement.date)}
            </span>
          </div>

          {/* Registration Link Badge */}
          {achievement.registrationLink && (
            <a
              href={achievement.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 hover:bg-purple-600/20 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all group/link"
            >
              <ExternalLink size={14} className="text-purple-400 group-hover/link:text-purple-300" />
              <span className="text-xs text-slate-300 font-medium">Register</span>
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link 
            href={`/achievement/${achievement.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-300 group/btn"
          >
            <Eye size={16} />
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default AchievementCard;