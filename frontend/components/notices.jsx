"use client";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Button } from "@/components/ui/button";
import api from "@/config/index";
import { ArrowRight, Calendar, ExternalLink, Eye, MapPin, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Notices() {
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      setLoading(true);
      const data = await api.get('/notice');
      setNotices(data.notices || []);
      console.log(notices)
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="notices" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Latest Updates
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Notice Board
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Stay updated with the latest announcements, notices, and opportunities from our IT Club. 
            Check back regularly for new notices and important information.
          </p>
        </div>

        {/* Recent Notices */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Recent Notices</h3>
          
          {loading ? (
            <SkeletonLoader />
          ) : notices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No notices found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notices?.map((notice) => (
                <article
                  key={notice.id}
                  className="tech-card overflow-hidden backdrop-blur-sm group relative hover:shadow-2xl transition-all duration-500"
                >
                  <div className="corner-accent top-left" />
                  <div className="corner-accent top-right" />
                  <div className="corner-accent bottom-left" />
                  <div className="corner-accent bottom-right" />
                  
                  {/* Image Section - Now clickable */}
                  <Link href={`/notice/${notice.id}`} className="block relative h-52 overflow-hidden bg-muted cursor-pointer">
                    <img
                      src={notice.image || "/placeholder.svg"}
                      alt={notice.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-primary/90 text-primary-foreground text-xs font-bold rounded uppercase tracking-wider backdrop-blur-sm shadow-lg">
                        {notice.type || 'Notice'}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
                        <span className="text-sm font-semibold flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Title - Also clickable */}
                    <Link href={`/notice/${notice.id}`}>
                      <h4 className="font-bold text-xl mb-3 uppercase tracking-wide line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {notice.title}
                      </h4>
                    </Link>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {notice.description}
                    </p>

                    {/* Info Grid */}
                    <div className="space-y-2.5 pt-2">
                      {/* Deadline */}
                      <div className="flex items-center gap-2.5 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-xs">Deadline:</span>
                        <span className="bg-muted px-2.5 py-1 rounded text-xs font-semibold flex-1">
                          {formatDate(notice.deadline)}
                        </span>
                      </div>

                      {/* Location - Optional */}
                      {notice.location && (
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground text-xs line-clamp-1">
                            {notice.location}
                          </span>
                        </div>
                      )}

                      {/* Attendees - Optional */}
                      {notice.attendees && (
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {notice.attendees} attending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons - Now properly separated and clickable */}
                    <div className="flex flex-col gap-2.5 pt-4">
                      {/* Primary - View Details with Next.js Link */}
                      <Link 
                        href={`/notice/${notice.id}`}
                        className="w-full"
                      >
                        <Button
                          className="w-full group/btn uppercase tracking-wide text-sm font-bold"
                          size="lg"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>

                      {/* Secondary - Register Link (if exists) */}
                      {notice.registrationLink && (
                        <a
                          href={notice.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full group/reg border-2 hover:bg-primary hover:text-primary-foreground uppercase tracking-wide text-sm font-bold"
                            size="lg"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 group-hover/reg:rotate-12 transition-transform" />
                            Register Now
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}