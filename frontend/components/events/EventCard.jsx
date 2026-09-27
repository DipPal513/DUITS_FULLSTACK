import { CalendarDays, Edit, ExternalLink, MapPin, Trash2 } from 'lucide-react';
import Link from 'next/link';

const formatDate = (dateString) => {
  if (!dateString) return 'Date to be announced';
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
  });
};

const EventCard = ({ event, onEdit, onDelete }) => {
  const eventDate = event.date ? new Date(`${event.date}T00:00:00`) : null;
  const registrationLink = event.registration_link || event.registrationLink;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {event.image ? (
          <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">DUITS event</div>
        )}
        {eventDate && (
          <div className="absolute left-4 top-4 min-w-14 border border-slate-200 bg-white px-3 py-2 text-center dark:border-slate-700 dark:bg-slate-950">
            <span className="block text-xs font-bold uppercase text-blue-800 dark:text-blue-300">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
            <span className="block text-2xl font-semibold leading-tight text-slate-900 dark:text-white">{eventDate.getDate()}</span>
          </div>
        )}
        {(onEdit || onDelete) && (
          <div className="absolute right-3 top-3 flex gap-2">
            {onEdit && <button onClick={() => onEdit(event)} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 hover:text-blue-700" title="Edit event"><Edit size={16} /></button>}
            {onDelete && <button onClick={() => onDelete(event)} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 hover:text-red-700" title="Delete event"><Trash2 size={16} /></button>}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/events/${event.id}`} className="group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
          <h2 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900 group-hover/title:text-blue-800 dark:text-white dark:group-hover/title:text-blue-300">{event.title}</h2>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{event.description}</p>
        </Link>
        <div className="mt-auto space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><CalendarDays size={16} className="shrink-0 text-blue-700 dark:text-blue-300" />{formatDate(event.date)}</p>
          {event.location && <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><MapPin size={16} className="shrink-0 text-blue-700 dark:text-blue-300" />{event.location}</p>}
          <div className="flex items-center justify-between gap-3 pt-1">
            <Link href={`/events/${event.id}`} className="text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300">Event details</Link>
            {registrationLink && <a href={registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-blue-800 dark:text-slate-200 dark:hover:text-blue-300"><ExternalLink size={14} /> Register</a>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
