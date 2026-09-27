import { CalendarDays, Edit, Trash2 } from 'lucide-react';

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No publish date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {blog.image && <img src={blog.image} alt="" className="h-44 w-full object-cover" loading="lazy" />}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-3 inline-flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={14} />{formatDate(blog.date)}</p>
        <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-slate-900 dark:text-white">{blog.title}</h2>
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{blog.description}</p>
        <div className="mt-auto flex items-center justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
          {onEdit && <button onClick={() => onEdit(blog)} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-800 dark:border-slate-700 dark:text-slate-200" title="Edit article"><Edit size={15} />Edit</button>}
          {onDelete && <button onClick={() => onDelete(blog)} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-red-300 hover:text-red-700 dark:border-slate-700 dark:text-slate-200" title="Delete article"><Trash2 size={15} />Delete</button>}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;