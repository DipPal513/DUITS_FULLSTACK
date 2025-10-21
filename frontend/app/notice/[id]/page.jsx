'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  ArrowLeft, 
  Clock, 
  Users,
  Info,
  Share2,
  Mail,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import api from '@/config/index';
import toast from 'react-hot-toast';

const NoticeDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticeDetails();
  }, [params.id]);

  const fetchNoticeDetails = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/notice/${params.id}`);
      setNotice(data.notice || data);
    } catch (error) {
      console.error('Error fetching notice:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: notice?.title,
      text: notice?.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading notice details...</p>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">
            Notice Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            The notice you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/notices">
            <Button size="lg" className="uppercase tracking-wide">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Notices
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="uppercase tracking-wide"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="uppercase tracking-wide"
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Card */}
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-lg">
              <div className="relative h-[28rem] bg-muted">
                <img
                  src={notice.image || "/placeholder.svg"}
                  alt={notice.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  {/* Type Badge */}
                  <div className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-md uppercase tracking-wider backdrop-blur-sm shadow-lg">
                    {notice.type || 'Notice'}
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                    {notice.title}
                  </h1>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">{formatShortDate(notice.deadline)}</span>
                    </div>
                    {notice.attendees && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium">{notice.attendees} Attending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-wide">
                  Description
                </h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {notice.description}
                </p>
              </div>
            </div>

            {/* Additional Details Card */}
            {(notice.additionalInfo || notice.requirements) && (
              <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Additional Information
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  {notice.additionalInfo && (
                    <p className="leading-relaxed">{notice.additionalInfo}</p>
                  )}
                  {notice.requirements && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                      <p className="leading-relaxed">{notice.requirements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-6">
                Event Details
              </h3>
              
              <div className="space-y-5">
                {/* Deadline */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                      Deadline
                    </p>
                    <p className="font-semibold text-sm">
                      {formatDate(notice.deadline)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                {notice.location && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                        Location
                      </p>
                      <p className="font-semibold text-sm break-words">
                        {notice.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Time */}
                {notice.time && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                        Time
                      </p>
                      <p className="font-semibold text-sm">
                        {notice.time}
                      </p>
                    </div>
                  </div>
                )}

                {/* Attendees */}
                {notice.attendees && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                        Attendees
                      </p>
                      <p className="font-semibold text-sm">
                        {notice.attendees} people attending
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration CTA Card */}
            {notice.registrationLink && (
              <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-lg">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                  Ready to Join?
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Register now to secure your spot and be part of this amazing event!
                </p>
                <Link
                  href={notice.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="w-full uppercase tracking-wide font-bold group"
                  >
                    <ExternalLink className="mr-2 w-5 h-5" />
                    Register Now
                    <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Contact Card */}
            {(notice.contactEmail || notice.contactPhone) && (
              <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h3 className="text-lg font-bold uppercase tracking-wide mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {notice.contactEmail && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Email</p>
                        <a
                          href={`mailto:${notice.contactEmail}`}
                          className="text-sm text-primary hover:underline break-all font-medium"
                        >
                          {notice.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}
                  {notice.contactPhone && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                        <a
                          href={`tel:${notice.contactPhone}`}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {notice.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailsPage;