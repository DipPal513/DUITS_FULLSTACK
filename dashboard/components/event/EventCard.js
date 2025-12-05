import { Calendar, Edit, ExternalLink, MapPin, Trash2 } from 'lucide-react';

const EventCard = ({ event, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to safely get date parts for the badge
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:backdrop-blur-sm dark:hover:border-slate-700 dark:hover:shadow-slate-950/50">
      
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={event?.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Date Badge Overlay */}
        <div className="absolute left-4 top-4 flex flex-col items-center justify-center rounded-xl bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm dark:bg-slate-950/90 border border-slate-100 dark:border-slate-800 z-10">
          <span className="text-xs font-bold uppercase text-red-500 tracking-wider">{month}</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white leading-none mt-0.5">{day}</span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Admin Actions */}
        {(onEdit || onDelete) && (
          <div className="absolute right-3 top-3 flex gap-2 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="rounded-lg bg-white/90 p-2 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 border border-white/20 dark:border-slate-700"
                title="Edit Event"
              >
                <Edit size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event);
                }}
                className="rounded-lg bg-white/90 p-2 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-red-50 hover:text-red-600 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-red-900/50 dark:hover:text-red-400 border border-white/20 dark:border-slate-700"
                title="Delete Event"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-grow flex-col p-5">
        <div className="mb-4">
          <h3 className="mb-2 line-clamp-1 text-lg sm:text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {event.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {event.description}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          {/* Metadata Row */}
          <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800/50">
            
            <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <Calendar size={16} className="shrink-0 text-purple-500" />
              <span className="truncate">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={16} className="shrink-0 text-pink-500" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Action Button */}
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white border border-transparent dark:border-slate-700"
            >
              <ExternalLink size={16} />
              Register Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;