'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Sparkles,
  Music
} from 'lucide-react'

const defaultEvent = {
  id: 'evt-123',
  title: 'Summer Music Festival 2024',
  description: 'Join us for an unforgettable night of live performances and entertainment',
  date: 'June 15, 2024',
  time: '8:00 PM - 2:00 AM',
  location: 'Central Park Amphitheater',
 
  category: 'Music Festival',
  image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
  accentColor: 'from-purple-500 to-pink-500',
  price: '$45',
}

const EventCard = ({ event = defaultEvent }) => {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/events/${event.id || event._id}`)
  }

  return (
    <div 
      onClick={handleViewDetails}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-500 hover:shadow-2xl">
        
        {/* ===============================
            1. IMAGE SECTION WITH OVERLAY
        =============================== */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
          {/* Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${event.accentColor} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
          
          {/* Dark Overlay Base */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
              <Music className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-gray-900">
                {event.category}
              </span>
            </div>
          </div>

      

          {/* Floating Icon - appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="transform transition-transform duration-500 group-hover:scale-100 scale-75">
              <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ===============================
            2. CONTENT SECTION
        =============================== */}
        <div className="relative p-5 md:p-6">
          
          {/* Event Title */}
          <h3 className="text-lg md:text-xl font-bold line-clamp-2 mb-2 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Event Details Grid */}
          <div className="space-y-2.5 mb-5">
            
            {/* Date */}
            <div className="flex items-center gap-3 text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">{event.date}</span>
            </div>

          
            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium truncate">{event.location}</span>
            </div>

            
          </div>

          {/* Divider */}
          <div className="h-px bg-border/50 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-500/50 group-hover:via-transparent group-hover:to-pink-500/50 transition-all duration-500" />

          {/* CTA Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
            className=" "
            variant="default"
          >
            <span>Get Tickets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* ===============================
            3. DECORATIVE ELEMENTS
        =============================== */}
        
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
        
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

export default EventCard